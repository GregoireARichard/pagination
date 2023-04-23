import express from "express";
import mysql, { Connection } from "mysql"

interface Film {
  name: string;
  title: string;
  rental_rate: number;
  rating: string;
  inventory_id: number;
  nbOfRentals: number;
}
const pool = mysql.createPool({
  host: "unixshell.hetic.glassworks.tech",
  port: 27116,
  user: "student",
  password: "Tk0Uc2o2mwqcnIA",
  database: "sakila",
  connectionLimit: 10
});


export default class ApiService {
  public static async sendDataFromPage(
    order: string,
    sortAttr: string
  ) {
    const sqlquery = `select 
        category.name, film.title, film.rental_rate, film.rating, rental.inventory_id, count(*) as nbOfRentals
        from film, film_category, category, rental
        where 
        film_category.film_id = film.film_id and 
        category.category_id = film_category.category_id and
        rental.inventory_id = film.film_id
        group by title
        order by ${sortAttr} ${order}
       `;

    const connection: Connection | any = await new Promise((resolve, reject) => {
      pool.getConnection((err: any, connection: Connection) => {
        if (err) reject(err);
        else resolve(connection);
      });
    });
  
    try {
      const queryResult = await new Promise((resolve, reject) => {
        connection.query(sqlquery, (err: any, results: any, fields: any) => {
          if (err) reject(err);
          else resolve(results);
        });
      });
      return queryResult as Film[];
    } finally {
      connection.release();
    }
  }
}