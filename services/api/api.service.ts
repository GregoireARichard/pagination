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
    sortAttr: string,
    offset: number,
    pageSize: number
  ) {
    const sqlquery = `
    SELECT film.film_id, film.title AS title, film.rental_rate, film.rating,
    category.name AS name, COUNT(rental.rental_id) AS nbOfRentals
    FROM film
    INNER JOIN film_category ON film.film_id = film_category.film_id
    INNER JOIN category ON film_category.category_id = category.category_id
    LEFT JOIN inventory ON film.film_id = inventory.film_id
    LEFT JOIN rental ON inventory.inventory_id = rental.inventory_id
    GROUP BY film.film_id, title, film.rental_rate, film.rating, name
    ORDER BY ${sortAttr} ${order}
    LIMIT ${offset}, ${pageSize}
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