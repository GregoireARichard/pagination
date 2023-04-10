import express  from "express";
import mysql from "mysql"

export default class ApiService{
    
    public static async sendDataFromPage(page: number, limit: number, order: string, sortAttr: string){
        const sqlquery = `select 
        category.name, film.title, film.rental_rate, film.rating, rental.inventory_id, count(*) as nbOfRentals
        from film, film_category, category, rental
        where 
        film_category.film_id = film.film_id and 
        category.category_id = film_category.category_id and
        rental.inventory_id = film.film_id
        group by title
        order by ${sortAttr} ${order}
        limit ${limit}
        offset ${limit * (page-1)}`
        const queryRes: any[] = []
        const connection = mysql.createConnection({
        host     : 'unixshell.hetic.glassworks.tech',
        port     : 27116,
        user     : 'student',
        password : 'Tk0Uc2o2mwqcnIA',
        database : 'sakila'
        });
        connection.connect();

        connection.query(sqlquery, function (error: any, results: { solution: any; }[], fields: any) {
        if (error) throw error;
        console.log(results)
        });
        console.log(sqlquery)
        connection.end();   
        return ""
    }
}