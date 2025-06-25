export const updateGuideStatus = async (user, bookingId, guideStatus) => {
    const response = await fetch(`/api/travel-guides/supplier/bookings/${bookingId}/guide-status`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guideStatus }),
    });
    if (!response.ok) throw new Error('Failed to update guide status');
};


export const approveBooking = async (user, bookingId) => {
    const response = await fetch(`/api/travel-guides/supplier/booking/${bookingId}/approve`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${user.token}` },
    });
    if (!response.ok) throw new Error('Failed to approve booking');
};

export const cancelBooking = async (user, bookingId) => {
    const response = await fetch(`/api/travel-guides/supplier/booking/${bookingId}/cancel`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${user.token}` },
    });
    if (!response.ok) throw new Error('Failed to cancel booking');
};
