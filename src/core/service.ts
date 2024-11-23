import { CreateCard } from "@/models/create-card";

export default class Service{
    private headers: any = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-access-token' // Include this if authentication is needed
    }

    constructor(){}

    public async createCard(card: CreateCard){
        const query = `
            mutation CreateCard($card: NewCard!) {
                createCard(card: $card) {
                    title
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
                console.log("DATA: " + JSON.stringify(data))
                return data.data
        })
            .catch(error => {
                console.error('Error:', error);
                return {error}
        });

        return response
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
                    status
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