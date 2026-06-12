/*
* CTConfiguration : read static configuration
*/
export default class CTConfiguration {
    constructor() {}
    load() {
        let res = $.Deferred();
        $.get("./config/config.json")
            .done((data) => {
                if (data) {
                    data = JSON.parse(data);
                }
                res.resolve(data);
            })
            .fail(() => {
                console.log('configuration error');
                res.reject();
            });
        return res.promise();
    }
}
