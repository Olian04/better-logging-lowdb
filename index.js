const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const init = (dbPath) => {
    const adapter = new FileSync(dbPath);
    const db = low(adapter);
    db.defaults({ logs: [] })
      .write();
    
    return ({
        db,
        middleware: {
            onLogEmitted: log => {
                if (db) {
                    db.get('logs')
                        .push({ time: Date.now(), log })
                        .write();
                }
            }
        }
    });
}
module.exports = init;
module.exports.default = init;