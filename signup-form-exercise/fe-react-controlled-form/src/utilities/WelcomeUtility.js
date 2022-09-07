function generateWelcomeMessage(name = "", excitement = 0) {
    if (excitement === 0) {
        return "";
    }
    if (excitement <= 2) {
        return "Welcome!";
    }
    if (excitement <= 6) {
        return `Welcome ${name}! 😉`;
    }
    if (excitement <= 9) {
        return `Welcome ${name}! 🤩`;
    }
    return `Welcome ${name}! 🥳`;
}

export { generateWelcomeMessage };