import Goal from '../models/Goal';
import { HabitGoal } from '../models/HabitGoal';
import GoalOverview from '../models/GoalOverview';

export default class GoalService {
    loadGoalOverviews(): Promise<GoalOverview[]> {
        return fetch('https://localhost:44343/api/Goals', { mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*' } })
            .then(function (response) {
                return response.json();
            });
    }

    loadHabitGoals(): Promise<HabitGoal[]> {
        return fetch('https://localhost:44343/api/HabitGoal', { mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*' } })
            .then(function (response) {
                return response.json();
            });
    }
}