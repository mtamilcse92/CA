/**
 * EntitiesController
 *
 * @description :: Server-side logic for managing entities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



    /**
     * `EntitiesController.index()`
     */
    // index: function (req, res) {
    //   return res.json({
    //     todo: 'index() is not implemented yet!'
    //   });
    // },


    /**
     * `EntitiesController.new()`
     */
    new: function(req, res) {
        return res.json({
            todo: 'new() is not implemented yet!'
        });
    },


    /**
     * `EntitiesController.show()`
     */
    show: function(req, res) {
        var id = req.param('id');
        Entities.findOne(id).populate('fields').exec(function(err, show) {
            if (err) return res.send(err, 500);
            res.json({ EntityTypeShow: show });
        });
    },


    /**
     * `EntitiesController.create()`
     */
    create: function(req, res) {
        var values = req.params.all();
        var id ;
        Entities.create(values, function(err, create) {
            if (err) return res.send(err, 500);
            id = create.id;
            Entities.find({ id: id }).populate('fields').exec(function(err, entitiesFields) {
            if (err) return res.send(err, 500);
            console.log(entitiesFields);
            res.json( {entitiesCreated: entitiesFields} );
        });
        });
    },


    /**
     * `EntitiesController.edit()`
     */
    edit: function(req, res) {
        return res.json({
            todo: 'edit() is not implemented yet!'
        });
    },


    /**
     * `EntitiesController.update()`
     */
    update: function(req, res) {
       var values = req.params.all();
        var id = req.param('id');
        Entities.update(id, values, function(err, update) {
            if (err) return res.send(err, 500);
            Entities.find({ id: id }).populate('fields').exec(function(err, entitiesUpdated) {
            if (err) return res.send(err, 500);
            console.log(entitiesUpdated);
            res.json( {entitiesCreated: entitiesUpdated} );
        });
        });
    },


    /**
     * `EntitiesController.destroy()`
     */
    destroy: function(req, res) {
        var id = req.param('id');
        Entities.find(id, function(err, entities) {
            if (err) return res.send(err, 500);
            if (!entities) return res.send("No user with that id.", 404);

            Entities.destroy({ id: id }).exec(function(err, entities) {
                        if (err) return res.send(err, 500);
                        Fields.destroy({ entities: id }).exec(function(err, fields) {
                            if (err) return res.send(err, 500);
                        });
                    });
                res.json({ EntitiesValues: "deleted" });
        });
    }
};
