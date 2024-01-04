import { DynamicModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { getConnection, Connection } from "typeorm"

const ormConfig = require("../../../ormconfig.js")

export class TypeOrmInitializer {
  static getRootModule = (forTest?: boolean): DynamicModule => {
    ormConfig.url = forTest ? process.env.TEST_DB_STRING : process.env.DB_STRING
    if (forTest) ormConfig.synchronize = true
    return TypeOrmModule.forRoot(ormConfig)
  }
  static async disconnect() {
    await getConnection().close()
  }
  static async clear() {
    let connection: Connection
    try {
      connection = getConnection()
    } catch (e) {
      return
    }
    await connection.dropDatabase()
    await connection.synchronize()
  }
}
