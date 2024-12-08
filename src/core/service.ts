import { CreateCard } from "@/models/create-card";
import { TaskCard, UpdateTaskCard } from "@/models/task-card";

export default class Service{
    private headers: any = {
        'Access-Control-Allow-Origin': "*",
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-access-token' // Include this if authentication is needed
    }

    constructor(){}

    static async getChapGPTResume(message: string){
        const headers: any = {
            'Content-Type': 'application/json',
        };

        const requestBody = JSON.stringify({
            message
        })

        const response = await fetch("http://localhost:4000/chatgpt-resume", {
            method: 'POST',
            headers: headers,
            body: requestBody
        })
            .then(response => response.json())
            .then(data => {
                console.log("DATA: " + JSON.stringify(data))
                return data;
        })
            .catch(error => {
                console.error('Error:', error);
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

        const response = await fetch("http://localhost:4000/graphql", {
            method: 'POST',
            headers: headers,
            body: requestBody
        })
            .then(response => response.json())
            .then(data => {
                console.log("DATA: " + JSON.stringify(data))
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

        const response = await fetch("http://localhost:4000/graphql", {
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
            'Authorization': 'Bearer your-access-token' // Include this if authentication is needed
        };

        const query = `
            mutation UpdateCard($card: UpdateCard) {
                updateCard(card: $card)
            }
        `;

        const variables = {
            card
        }

        const response = fetch("http://localhost:4000/graphql", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({query, variables})
        })
            .then(response => response.json())
            .then(data => {
                console.log
        })
            .catch(error => {
                console.error('Error:', error);
                return {error}
        });

        return "response"
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

        const response = fetch("http://localhost:4000/graphql", {
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