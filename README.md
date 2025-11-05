# **fe-bnb**

## **Overview**
`fe-bnb` is a frontend application for managing properties, bookings, and users in a property rental system. It is designed for hosts, admins, and users, providing features like property management, booking, and role-based access control.

---

## **Features**
- **User Authentication**:
  - Register and log in users.
  - Only logged-in users can create bookings.
- **Property Management**:
  - Hosts and admins can create, update, and delete properties.
  - Toggle property availability dynamically.
- **Booking System**:
  - Users can book properties.
  - Bookings include user details, property details, and automatically calculated total price.
- **Role-Based Access**:
  - Admins have full control over properties and users.
  - Hosts can manage their own properties but cannot book properties.
- **Dynamic UI**:
  - Conditional rendering based on user roles (e.g., hosts cannot book properties).
  - Toast notifications for success, error, and confirmation messages.

---

## **Struggles During Development**
1. **Role-Based Access Control**:
   - Implementing dynamic behavior based on user roles (e.g., restricting hosts from booking properties) required careful conditional rendering and backend validation.
   - Ensuring that only authorized users (admins or property owners) could update or delete properties was challenging.

2. **Dynamic State Management**:
   - Managing complex state for forms (e.g., property updates) while keeping the UI responsive and user-friendly was a significant challenge.
   - Handling asynchronous API calls and ensuring proper error handling required extra attention.

3. **Backend Integration**:
   - Ensuring seamless communication with the backend API for CRUD operations.
   - Handling edge cases like missing or invalid property IDs gracefully.

4. **UI/UX Consistency**:
   - Designing a consistent and brand-aligned UI for buttons, forms, and notifications.
   - Ensuring the app is responsive and works well across different screen sizes.

---

## **Future Developments**
1. **Code Reusability**:
   - Refactor shared logic (e.g., API calls, form handling) into reusable hooks or utility functions.
   - Create shared components for common UI elements like modals, toasts, and form inputs.
   - Expand the use of `UserContext` to manage global state for authentication, role-based access, and user-specific data.
   
2. **Dynamic Features**:
   - Add filters and sorting options for properties (e.g., by price, location, availability).
   - Allow admins to manage user roles dynamically (e.g., promote/demote users).

3. **Enhanced Booking System**:
   - Add a calendar view for property availability.
   - Allow users to modify or cancel their bookings.

4. **Improved Admin Dashboard**:
   - Add analytics and reports (e.g., total bookings, revenue, active properties).
   - Provide a detailed view of user activity and property performance.

5. **Backend Expansion**:
   - Leverage backend capabilities to add more dynamic features, such as:
     - Notifications for property updates or booking confirmations.
     - Advanced search functionality for properties and bookings.

6. **Testing and Optimization**:
   - Write unit and integration tests for critical components.
   - Optimize API calls to reduce latency and improve performance.

---

## **How to Run the Project**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/giecherry/fe-bnb.git
   cd fe-bnb
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a [`.env`](.env ) file in the root directory.
   - Add the following variables:
     ```env
     NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:1004
     ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. **Open the App**:
   - Navigate to `http://localhost:3000` in your browser.

---

## **Technologies Used**
- **Frontend**:
  - React with Next.js
  - Tailwind CSS for styling
  - Toastify for notifications
- **Backend**:
  - Supabase for database and authentication
  - Node.js for API endpoints
- **Other Tools**:
  - TypeScript for type safety

