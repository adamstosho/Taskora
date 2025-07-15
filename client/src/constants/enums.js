export const LOCATIONS = [
  'Lagos', 'Abuja', 'Ilorin', 'Port Harcourt', 'Kano', 'Ibadan', 'Enugu', 
  'Benin City', 'Jos', 'Ogbomoso', 'Oyo', 'Abeokuta', 'Awka', 'Onitsha', 
  'Nnewi', 'Ekwulobia', 'Obosi', 'Ikeja', 'Lagos Island', 'Lekki', 'Surulere', 
  'Badagry', 'Minna', 'Offa', 'Omu-Aran', 'Lafiagi', 'Patigi', 'Bida', 
  'Suleja', 'Kontagora', 'Zungeru', 'Other'
];

export const CATEGORIES = [
  'Tutoring', 'Errands', 'Repairs', 'Transport', 'Volunteer', 'Paid', 'Other'
];

export const TASK_STATUS = {
  OPEN: 'open',
  CLAIMED: 'claimed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const STATUS_COLORS = {
  [TASK_STATUS.OPEN]: 'bg-green-100 text-green-800',
  [TASK_STATUS.CLAIMED]: 'bg-blue-100 text-blue-800',
  [TASK_STATUS.COMPLETED]: 'bg-purple-100 text-purple-800',
  [TASK_STATUS.CANCELLED]: 'bg-red-100 text-red-800'
};

export const CATEGORY_COLORS = {
  'Tutoring': 'bg-indigo-100 text-indigo-800',
  'Errands': 'bg-yellow-100 text-yellow-800',
  'Repairs': 'bg-red-100 text-red-800',
  'Transport': 'bg-blue-100 text-blue-800',
  'Volunteer': 'bg-green-100 text-green-800',
  'Paid': 'bg-purple-100 text-purple-800',
  'Other': 'bg-gray-100 text-gray-800'
};