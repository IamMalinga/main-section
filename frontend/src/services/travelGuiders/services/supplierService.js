export const fetchUserData = async (user) => {
    const response = await fetch(`/api/users/${user._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch user details');
    return response.json();
};

export const fetchSupplierBookingsData = async (user) => {
    const response = await fetch('/api/travel-guides/supplier/bookings', {
        headers: { Authorization: `Bearer ${user.token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch supplier data');
    return response.json();
};

export const registerSupplier = async (user, supplierData) => {
    const response = await fetch('/api/travel-guides/supplier/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
        body: JSON.stringify(supplierData),
    });
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to register supplier');
    }
};

export const updateSupplierStatus = async (user, status) => {
    const response = await fetch('/api/travel-guides/supplier/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update supplier status');
};

export const fetchSupplierData = async (user) => {
    const response = await fetch('/api/travel-guides/supplier/data', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch supplier data');
    }

    return response.json();
};


export const saveGalleryImages = async (user, images) => {
    const response = await fetch(`/api/travel-guides/${user._id}/gallery`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ images }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save images');
    }

    return response.json();
};
