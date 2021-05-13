const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "dj",
    aliases: ["dj"],
    category: "info",
    description: "What is the DJ Role",
    usage: `${config.prefix}dj`,
    run: async (client, message, args) => {
        if (!functions.check_if_dj(message))
            return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `❌ There are no DJ ROLES`)  

        return functions.embedbuilder(client, "null", message, config.colors.yes, "DJ-ROLE", `These are the DJ ROLES`, `${functions.check_if_dj(message)}`)
    }
}
