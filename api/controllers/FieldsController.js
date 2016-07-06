/**
 * FieldsController
 *
 * @description :: Server-side logic for managing fields
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



    /**
     * `FieldsController.index()`
     */
    // index: function (req, res) {
    //   return res.json({
    //     todo: 'index() is not implemented yet!'
    //   });
    // },


    /**
     * `FieldsController.new()`
     */
    new: function(req, res) {
        return res.json({
            todo: 'new() is not implemented yet!'
        });
    },


    /**
     * `FieldsController.show()`
     */
    show: function(req, res) {
        var id = req.param('id');
        Fields.findOne(id, function(err, show) {
            if (err) return res.send(err, 500);
            res.json({ FieldShow: show });
        });
    },


    /**
     * `FieldsController.create()`
     */
    create: function(req, res) {
        var values = req.params.all();
        Fields.create(values, function(err, create) {
            if (err) return res.send(err, 500);
            res.json({ FieldCreate: create });
        });
    },


    /**
     * `FieldsController.edit()`
     */
    edit: function(req, res) {
        return res.json({
            todo: 'edit() is not implemented yet!'
        });
    },


    /**
     * `FieldsController.update()`
     */
    update: function(req, res) {
        var values = req.params.all();
        var id = req.param('id');
        Fields.update(id, values, function(err, update) {
            if (err) return res.send(err, 500);
            res.json({ FieldUpdate: update });
        });
    },


    /**
     * `FieldsController.destroy()`
     */
    destroy: function(req, res) {
        var id = req.param('id');
        Fields.find(id, function(err, fields) {
            if (err) return res.send(err, 500);
            if (!fields) return res.send("No user with that id.", 404);
            Field.destroy(id, function(err) {
                if (err) return res.send(err, 500);
                res.json({ FieldValues: "deleted" });
            });
        });
    }
};
