export default class Task {
    constructor(taskName, description, tier, consecutiveDays) {
        this.taskName = taskName;
        this.description = description;
        this.tier = tier; 
        this.consecutiveDays = consecutiveDays;
    }

    getTierClass() {
        if (this.tier === 'Micro') {
            return 'Micro';
        } else if (this.tier === 'Intermedio') {
            return 'Intermedio';
        } else if (this.tier === 'Alto-Impacto') {
            return 'Alto-Impacto';
        }
    }
}