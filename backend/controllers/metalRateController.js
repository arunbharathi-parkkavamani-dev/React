import MetalRates from '../models/MetalRates.js';

export const getAllMetalRates = async (req, res) => {
    try {
        const metalRates = await MetalRates.find();
        res.json(metalRates);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch metal rates' });
    }
};

export const getMetalRateById = async (req, res) => {
    try {
        const metalRate = await MetalRates.findById(req.params.id);
        res.json(metalRate);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch metal rate' });
    }
};

export const createMetalRate = async (req, res) => {
    try {
        const newRate = new MetalRates(req.body);
        await newRate.save();
        res.status(201).json({ message: 'Metal rate added successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save metal rate' });
    }
};

export const updateMetalRate = async (req, res) => {
    try {
        const updatedRate = await MetalRates.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedRate) return res.status(404).json({ error: 'Metal rate not found' });
        res.json({ message: 'Updated successfully', data: updatedRate });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update metal rate' });
    }
};

export const deleteMetalRate = async (req, res) => {
    try {
        const deleted = await MetalRates.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Metal rate not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete metal rate' });
    }
};

export const updateGoldRateFromAPI = async () => {
    console.log("Fetching gold rate...");
    try {
        const response = await fetch(`https://api.metalpriceapi.com/v1/latest?api_key=7fb8bae3fa1886dbffcbdc3718950d9d&base=USD&currencies=XAU,INR`);
        const data = await response.json();

        const rateXAU = data.rates.XAU; // 1 USD = 0.000298 XAU
        const rateINR = data.rates.INR;

        if (!rateXAU || !rateINR) {
            console.error('❌ Invalid data from API');
            return;
        }

        const goldPricePerGramINR = (1 / rateXAU / 31.1035) * rateINR;
        const gold24KT = parseFloat(goldPricePerGramINR.toFixed(2));

        // Optional: derive 22KT and 18KT
        const gold22KT = Math.round(gold24KT * 0.916);
        const gold20KT = Math.round(gold24KT * 0.833);
        const gold18KT = Math.round(gold24KT * 0.750);

        // Update the first document or by employee
        const updated = await MetalRates.findOneAndUpdate(
            { employee: 'admin' }, // or {} to update the first doc
            {
                gold24KT,
                gold22KT,
                gold20KT,
                gold18KT,
                employee: 'admin',
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!updated) {
            console.error('❌ Metal rate document not found');
            return;
        }

        console.log('✅ Gold rate updated from API:', updated);

    } catch (err) {
        console.error("❌ Error updating gold rate:", err.message);
    }
};

