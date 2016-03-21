/**
 * Send anything to the MP Server.
 * Sending query builder.
 */

/**
 * Send
 * @class Send
 * @type {Send}
 */
export default class Send {

  /**
   * Construct sending query instance.
   *
   * @param {App} app
   * @param {ServerClient} client
   */
  constructor(app, client) {
    this.app = app;
    this.client = client;

    // Contains the sending queue. (raw).
    this.query = {};
  }

  /**
   * Send chat message.
   *
   * @param {string} text
   * @param {object} options Optional options.
   * @param {string} options.source Source of message, could be 'player', 'server' or 'global' (default)
   * @param {string} options.destination Destination, false for all, string for login (default false).
   *
   * @return {Send}
   */
  chat(text, options) {
    options = options || {};
    let source = options.source || 'global';
    let destination = options.destination || false;

    if (source === 'global') {
      if (! destination) {
        this.query = {
          query: 'ChatSendServerMessage',
          params: [('»» ' + text)]
        }
      } else {
        this.query = {
          query: 'ChatSendServerMessageToLogin',
          params: [('» ' + text), destination]
        }
      }
    }

    return this;
  }

  /**
   * Custom Query (maniaplanet query).
   * @param {string} query query string.
   * @param {object} params array of parameters.
   * @return {Send}
   */
  custom(query, params) {
    params = params || [];
    this.query = {
      query: query,
      params: params
    };
    return this;
  }

  /**
   * Execute builded query.
   *
   * @return {Promise|boolean}
   */
  exec() {
    if (! this.query.hasOwnProperty('query')) {
      return false;
    }
    return this.client.gbx.query(this.query.query, this.query.params);
  }
}


