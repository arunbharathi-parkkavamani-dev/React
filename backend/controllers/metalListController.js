import MetalList from "../models/MetalList.js";

export const getAllMetalLists = async (req, res) => {
    try {
        const metalLists = await MetalList.find().sort({ id: -1 });
        res.json(metalLists);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getMetalListByID = async (req, res) => {
    try {
        const metalList = await MetalList.findById(req.params.id);
        res.json(metalList);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const createMetalList = async (res, req) => {
    try {
        const newList = new MetalList(req.body);
        await newList.save();
        res.status(201).json({ message: 'Metal List Addded' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const updateMetalList = async (res, req) => {
    try {
        const updateMetalList = await MetalList.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updateMetalList) return res.status(404).json({ error: 'Metal List Not Found' });
        res.json({ message: 'updated successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const deleteMetalList = async (req, res) => {
    try {
        const deleted = await MetalList.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Metal List not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete metal rate' });
    }
};