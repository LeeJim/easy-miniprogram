import { DataSource } from "typeorm"
import { Application, User, Subscription, Action } from './entity'

require('dotenv').config({ debug: true })

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DB } = process.env;

export default new DataSource({
  type: "mysql",
  host: MYSQL_HOST,
  port: parseInt(MYSQL_PORT, 10) ?? 3306,
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB,
  synchronize: true,
  logging: true,
  entities: [Application, User, Subscription, Action],
  subscribers: [],
  migrations: [],
})

