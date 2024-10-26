import { config } from 'dotenv';
import midtransClient from 'midtrans-client';

config()
// Create Iris API instance
let iris = new midtransClient.Midtrans.Iris({
    serverKey: process.env.IRIS_MIDTRANS_API_KEY
});

// Function to create beneficiaries
const createBeneficiaries = async (beneficiaryData) => {
    try {
        const result = await iris.createBeneficiaries(beneficiaryData);
        return result;
    } catch (error) {
        throw new Error('Error creating beneficiaries: ' + error.message);
    }
};

// Function to get balance
export const getBalance = async () => {
    try {
        const balance = await iris.getBalance();
        return balance;
    } catch (error) {
        throw new Error('Error fetching balance: ' + error.message);
    }
};
