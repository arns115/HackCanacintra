export default class Task {
    constructor(taskName, description, tier, consecutiveDays) {
        this.taskName = taskName;
        this.description = description;
        this.tier = tier; // Example: ['Bronze', 'Silver', 'Gold']
        this.consecutiveDays = consecutiveDays; // Number of days user has done this task
    }

}