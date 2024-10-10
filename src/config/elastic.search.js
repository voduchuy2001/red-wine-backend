import { Client } from '@elastic/elasticsearch'

const host = process.env.APP_URL || 'localhost'
const port = process.env.PORT || 6969

export const client = new Client({ node: `${host}:${port}]` })
