import express  from "express";
import mysql from "mysql"


export default class ApiController{
    public static async sendDataFromPage(page: number){
        const sqlquery = `select category.name, film.title, film.rental_rate
        from film, film_category, category
        where 
        film_category.film_id = film.film_id and 
        category.category_id = film_category.category_id
        limit 10`
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
        queryRes.push(results)
        });

        connection.end();   
        return ""
    }
}