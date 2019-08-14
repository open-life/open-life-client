import Goal from '../models/Goal';

export default class GoalService {
    loadGoals(): Promise<Goal[]> {
        return fetch('https://localhost:44343/api/Goals', { mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*' } })
            .then(function (response) {
                return response.json();
            });
    }
}