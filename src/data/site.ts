// ===== Easily editable company content =====
export const company = {
  name: "[Company Name]",
  tagline: "SAFE • RESPECTABLE • RELIABLE • SPEEDY",
  // PLACEHOLDER — replace with the real phone number
  phoneDisplay: "(585) 000-0000",
  phoneHref: "tel:+15850000000",
  // PLACEHOLDER — replace with the real email
  email: "info@yourcompany.com",
  logoSrc: "", // set to "/images/logo.png" to use Deborah's logo
};

export const hours = {
  days: "Monday – Sunday",
  time: "6:00 AM – 6:00 PM",
  short: "6 AM – 6 PM",
  openHour: 6,
  closeHour: 18,
  note: "Expanded operating hours may be introduced during the winter.",
};

export const counties = [
  { id: "orleans", name: "Orleans", seat: "Albion" },
  { id: "monroe", name: "Monroe", seat: "Rochester" },
  { id: "wayne", name: "Wayne", seat: "Lyons" },
  { id: "genesee", name: "Genesee", seat: "Batavia" },
  { id: "livingston", name: "Livingston", seat: "Geneseo" },
  { id: "ontario", name: "Ontario", seat: "Canandaigua" },
  { id: "wyoming", name: "Wyoming", seat: "Warsaw" },
];

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "area", label: "Service Area" },
  { id: "why", label: "Why Choose Us" },
  { id: "about", label: "About" },
  { id: "request", label: "Request" },
  { id: "contact", label: "Contact" },
];

export const services = [
  { key: "medical", title: "Medical Appointments", desc: "Reliable transportation to and from scheduled doctor appointments.", expect: ["Timely pickup planned around your appointment", "Courteous, professional drivers", "A clean, comfortable vehicle", "Assistance getting to the entrance on request"] },
  { key: "rehab", title: "Rehabilitation Facilities", desc: "Comfortable transportation for rehabilitation visits and ongoing care.", expect: ["Consistent transportation for recurring visits", "Patient, unhurried service", "Comfortable seating for the ride", "Clear communication about pickup times"] },
  { key: "facility", title: "Healthcare Facilities", desc: "Dependable rides to healthcare facilities and other essential destinations.", expect: ["Rides to clinics, centers, and essential destinations", "Professional, respectful drivers", "Dependable arrival", "Service across seven counties"] },
  { key: "scheduled", title: "Scheduled Medical Transportation", desc: "Professional transportation planned around your appointment schedule.", expect: ["Planning around your appointment time", "Advance request review by our team", "Reliable, punctual service", "Friendly follow-up communication"] },
  { key: "return", title: "Return Transportation", desc: "Convenient transportation back home or to your next destination.", expect: ["Return trips coordinated with your request", "Rides home or to your next stop", "A calm, comfortable journey", "Courteous door-to-door experience"] },
  { key: "support", title: "Specialized Patient Support", desc: "Respectful service designed around the needs of every passenger.", expect: ["Service delivered with dignity", "Attention to individual needs shared in advance", "Patient, caring drivers", "Contact our team to confirm specific requirements"] },
];

export const testimonials = [
  { quote: "Client testimonial placeholder — a future review from a passenger describing their experience will appear here.", name: "Placeholder Passenger", role: "Sample content" },
  { quote: "Client testimonial placeholder — feedback from a family member who arranged transportation for a loved one.", name: "Placeholder Family Member", role: "Sample content" },
  { quote: "Client testimonial placeholder — a note from a healthcare professional or care coordinator.", name: "Placeholder Care Coordinator", role: "Sample content" },
];

export const faqs = [
  { q: "What areas do you serve?", a: "We currently serve seven New York counties: Monroe, Genesee, Orleans, Wyoming, Ontario, Livingston, and Wayne." },
  { q: "What types of transportation do you provide?", a: "We provide non-emergency transportation to doctor and medical appointments, rehabilitation facilities, healthcare facilities, and other necessary destinations, including return trips." },
  { q: "What are your current operating hours?", a: "Our current operating hours are 6:00 AM – 6:00 PM." },
  { q: "How do I request transportation?", a: "You can submit a request using the Request Transportation form on this website or call our team. A member of our team will review your request and follow up with you." },
  { q: "Can I request transportation for a medical appointment?", a: "Yes. Transportation to and from medical appointments is one of our core services. Please include your appointment date and preferred pickup time in your request." },
  { q: "Do you provide transportation to rehabilitation facilities?", a: "Yes, we provide transportation to rehabilitation facilities, including for ongoing visits. Please contact our team to confirm availability and specific transportation requirements." },
  { q: "Can operating hours change during the winter?", a: "Expanded operating hours may be introduced during the winter. Our current hours remain 6:00 AM – 6:00 PM. Please contact our team for the latest information." },
  { q: "How far in advance should I request transportation?", a: "We recommend submitting your request as early as possible. Please contact our team to confirm availability and specific transportation requirements." },
];
