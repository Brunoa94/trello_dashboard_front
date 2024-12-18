import { CreateCard } from "@/models/create-card";
import { UpdateTaskCard } from "@/models/task-card";

export default class Service{
    private headers: any = {
        'Access-Control-Allow-Origin': "*",
        'Content-Type': 'application/json',
    }

    constructor(){}

    static async getChapGPTResume(message: string){
        const headers: any = {
            'Content-Type': 'application/json',
        };

        const requestBody = JSON.stringify({
            message
        })

        const response = await fetch("https://trello-dashboard-server.onrender.com/chatgpt-resume", {
            method: 'POST',
            headers: headers,
            body: requestBody
        })
            .then(response => response.json())
            .then(data => {
                return data;
        })
            .catch(error => {
                return {error}
        });

        return response;
    }

    static async deleteCard(id: string){
        const headers: any = {
            'Content-Type': 'application/json',
        };

        const query = `
            mutation DeleteCard($id: String) {
                deleteCard(id: $id)
            }
        `;

        const requestBody = JSON.stringify({
            query: query,
            variables: {
                id
            }
        });

        await fetch("https://trello-dashboard-server.onrender.com/graphql", {
            method: 'POST',
            headers: headers,
            body: requestBody
        })
            .then(response => response.json())
            .then(data => {
                return data.data
        })
            .catch(error => {
                console.error('Error:', error);
                return {error}
        });

        return "Deleted Successfuly"
    }

    public async createCard(card: CreateCard){
        const query = `
            mutation CreateCard($card: NewCard!) {
                createCard(card: $card) {
                    title,
                    id,
                    title_id,
                    story_type,
                    priority,
                    created_date,
                    status,
                    name,
                    avatar,
                    description
                }
            }
        `;

        const requestBody = JSON.stringify({
            query: query,
            variables: {
                card: card
            }
        });

        const response = await fetch("https://trello-dashboard-server.onrender.com/graphql", {
            method: 'POST',
            headers: this.headers,
            body: requestBody
        })
            .then(response => response.json())
            .then(data => {
                return data.data
        })
            .catch(error => {
                console.error('Error:', error);
                return {error}
        });

        return response
    }

    static async updateCard(card: UpdateTaskCard){
        const headers: any = {
            'Content-Type': 'application/json',
        };

        const query = `
            mutation UpdateCard($card: UpdateCard) {
                updateCard(card: $card)
            }
        `;

        const variables = {
            card
        }

        await fetch("https://trello-dashboard-server.onrender.com/graphql", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({query, variables})
        })
            .then(response => response.json())
            .then(data => {
                return data;
        })
            .catch(error => {
                console.error('Error:', error);
                return {error}
        });

        return "Updated Successfully"
    }
    
    public async fetchCards(){
        const query = `
            query Cards {
                cards {
                    title,
                    id,
                    title_id,
                    story_type,
                    priority,
                    created_date,
                    status,
                    name,
                    avatar,
                    description
                }
            }
        `;

        const requestBody = JSON.stringify({
            query: query,
        });

        const response = fetch("https://trello-dashboard-server.onrender.com/graphql", {
            method: 'POST',
            headers: this.headers,
            body: requestBody
        })
            .then(response => response.json())
            .then(data => {
                return data.data.cards
        })
            .catch(error => {
                console.error('Error:', error);
                return {error}
        });

        return response
    }
}