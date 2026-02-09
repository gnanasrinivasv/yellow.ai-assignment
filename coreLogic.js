const axios = require('axios');

module.exports = async (data) => {
    try {
        // Retrieve order ID from the bot's variables
        const orderId = data.variables.orderId || "YAI-0000";
        
        // Mock API URL from Beeceptor
        const API_URL = "https://your-custom-repo.free.beeceptor.com/api/v1/status";

        // Calling the external backend
        const response = await axios.get(API_URL, {
            params: { id: orderId }
        });

        if (response.data && response.data.status) {
            const { status, deliveryDate, updates } = response.data;
            
            // Return structured data back to the Yellow.ai Flow
            return {
                success: true,
                message: `Order ${orderId} is currently ${status}. Expected delivery is ${deliveryDate}.`,
                rawDetails: updates
            };
        }

        return { success: false, message: "Order ID not found." };

    } catch (error) {
        console.error("API Error:", error.message);
        return {
            success: false,
            message: "System is temporarily unavailable."
        };
    }
};
