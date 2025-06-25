export const fetchNotifications = async (userId) => {
    try {
      const response = await fetch(`/api/notifications/${userId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }
  };
  