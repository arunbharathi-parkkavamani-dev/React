// models/Sidenavbar.js
import mongoose from 'mongoose';

const SubLabelSchema = new mongoose.Schema({
  name: String,
  path: String,
  role: String
});

const IconSchema = new mongoose.Schema({
  name: String,
  package: String,
});

const SidenavbarSchema = new mongoose.Schema({
  label: { type: String, required: true },
  icon: IconSchema,
  sublabels: [SubLabelSchema]
});

const Sidenavbar = mongoose.model('Sidenavbar', SidenavbarSchema);
export default Sidenavbar;
