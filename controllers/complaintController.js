let complaints = [];
let idCounter = 1;

// GET all registered complaints
const getAllComplaints = (req, res) => {
  res.json(complaints);   
};

// GET complaint by ID to check specific complaint
const getComplaintById = (req, res) => {
  const id = parseInt(req.params.id);
  const complaint = complaints.find(c => c.id === id);
  if (!complaint) return res.status(404).json({ message: "Not found" });
  res.json(complaint);
};

// POST new complaint from request body
const createComplaint = (req, res) => {
  const { name, email, issue } = req.body;

  const newComplaint = {
    id: idCounter++,
    name,
    email: email || "",
    issue,
    status: "pending"
  };

  complaints.push(newComplaint);
  res.json(newComplaint);
};

// UPDATE complaint status
const updateComplaint = (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  const complaint = complaints.find(c => c.id === id);
  if (!complaint) return res.status(404).json({ message: "Not found" });

  complaint.status = status;
  res.json(complaint);
};

// DELETE complaint
const deleteComplaint = (req, res) => {
  const id = parseInt(req.params.id);
  complaints = complaints.filter(c => c.id !== id);
  res.json({ message: "Deleted successfully" });
};

//mvc architecture
module.exports = {
  getAllComplaints,
  getComplaintById,
  createComplaint,
  updateComplaint,
  deleteComplaint
};
