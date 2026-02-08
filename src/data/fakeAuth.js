const USERS_KEY = "fake_users";
const CURRENT_USER_KEY = "current_user";
const COURSES_KEY = "fake_courses";

const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY)) || [];
const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

const getCourses = () => {
    const data = localStorage.getItem(COURSES_KEY);
    const courses = data ? JSON.parse(data) : [];
    if (courses.length === 0) {
        return seedCourses();
    }
    return courses;
};
const saveCourses = (courses) => localStorage.setItem(COURSES_KEY, JSON.stringify(courses));

const seedCourses = () => {
    const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    const instructorName = currentUser ? currentUser.username : "Instructor_Alpha";

    const dummyCourses = [
        {
            id: 101,
            name: "Quantum Mechanics UI",
            code: "PHY402",
            type: "Video Course",
            lessons: 18,
            instructor: instructorName,
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800"
        },
        {
            id: 102,
            name: "React for Architects",
            code: "CS301",
            type: "Summaries",
            lessons: 25,
            instructor: instructorName,
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800"
        },
        {
            id: 103,
            name: "Neural Networks 101",
            code: "AI202",
            type: "Video Course",
            lessons: 12,
            instructor: instructorName,
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800"
        },
        {
            id: 104,
            name: "Advanced Calculus",
            code: "MATH202",
            type: "Hybrid",
            lessons: 30,
            instructor: instructorName,
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            image: "https://images.unsplash.com/photo-1635073726122-41a83e064972?q=80&w=800"
        },
        {
            id: 105,
            name: "Cyber Security Ops",
            code: "SEC505",
            type: "Video Course",
            lessons: 15,
            instructor: instructorName,
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800"
        },
        {
            id: 106,
            name: "Digital Art Theory",
            code: "DES101",
            type: "Summaries",
            lessons: 10,
            instructor: instructorName,
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            image: "https://images.unsplash.com/photo-1547891269-045ad91d9d9b?q=80&w=800"
        }
    ];
    saveCourses(dummyCourses);
    return dummyCourses;
};

export const registerUser = (user) => {
    const users = getUsers();
    const exists = users.find(u => u.email === user.email || u.username === user.username);
    if (exists) return { success: false, message: "User already exists" };

    const allowedRoles = ["teacher", "learner"];
    if (!allowedRoles.includes(user.role)) return { success: false, message: "Invalid role" };

    users.push(user);
    saveUsers(users);
    return { success: true };
};

export const loginUser = ({ identifier, password }) => {
    const users = getUsers();
    const user = users.find(u => (u.email === identifier || u.username === identifier) && u.password === password);

    if (!user) return { success: false, message: "Invalid credentials" };

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return { success: true, user };
};

export const logout = () => localStorage.removeItem(CURRENT_USER_KEY);
export const getCurrentUser = () => JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || null;

export const updateUser = (updatedUser) => {
    const users = getUsers();
    const index = users.findIndex(u => u.username === updatedUser.username);
    if (index === -1) return { success: false };

    users[index] = updatedUser;
    saveUsers(users);

    const currentUser = getCurrentUser();
    if (currentUser?.username === updatedUser.username) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    }
    return { success: true };
};

export const addCourse = (courseData) => {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'teacher') {
        return { success: false, message: "Only teachers can add courses" };
    }

    const courses = getCourses();
    const newCourse = {
        id: Date.now(),
        name: courseData.name,
        code: courseData.code,
        image: courseData.image,
        type: courseData.type || "Video Course",
        lessons: courseData.lessons || 0,
        pdfUrl: courseData.pdfUrl || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        instructor: currentUser.username,
        createdAt: new Date().toISOString()
    };

    courses.push(newCourse);
    saveCourses(courses);
    return { success: true, course: newCourse };
};

export const getTeacherCourses = () => {
    const currentUser = getCurrentUser();
    const courses = getCourses();
    if (!currentUser) return courses;
    return courses.filter(c => c.instructor === currentUser.username);
};

export const getAllCourses = () => getCourses();

export const deleteCourse = (courseId) => {
    let courses = getCourses();
    courses = courses.filter(c => c.id !== courseId);
    saveCourses(courses);
    return { success: true };
};