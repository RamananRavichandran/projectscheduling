let ns = {};

// Create the model instance
ns.model = (function() {
    'use strict';

    let $event_pump = $('body');

    // Return the API
    return {
        'read': function() {
            let ajax_options = {
                type: 'GET',
                url: 'api/people',
                accepts: 'application/json',
                dataType: 'json'
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_read_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },
        create: function(p_id, t_id) {
            let ajax_options = {
                type: 'POST',
                url: 'api/people',
                accepts: 'application/json',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    'p_id': p_id,
                    't_id': t_id
                })
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_create_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },
        update: function(p_id, t_id) {
            let ajax_options = {
                type: 'PUT',
                url: 'api/people/' + t_id,
                accepts: 'application/json',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    'p_id': p_id,
                    't_id': t_id
                })
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_update_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },
        'delete': function(t_id) {
            let ajax_options = {
                type: 'DELETE',
                url: 'api/people/' + t_id,
                accepts: 'application/json',
                contentType: 'plain/text'
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_delete_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        }
    };
}());

// Create the view instance
ns.view = (function() {
    'use strict';

    let $p_id = $('#p_id'),
        $t_id = $('#t_id');

    // return the API
    return {
        reset: function() {
            $t_id.val('');
            $p_id.val('').focus();
        },
        update_editor: function(p_id, t_id) {
            $t_id.val(t_id);
            $p_id.val(p_id).focus();
        },
        build_table: function(people) {
            let rows = ''

            // clear the table
            $('.people table > tbody').empty();

            // did we get a people array?
            if (people) {
                for (let i=0, l=people.length; i < l; i++) {
                    rows += `<tr><td class="p_id">${people[i].p_id}</td><td class="t_id">${people[i].t_id}</td><td class="p_name">${people[i].p_name}</td><td class="t_name">${people[i].t_name}</td><td class="start date">${people[i].p_from_date}</td><td class="end date">${people[i].p_to_date}</td></tr>`;
                }
                $('table > tbody').append(rows);
            }
        },
        error: function(error_msg) {
            $('.error')
                .text(error_msg)
                .css('visibility', 'visible');
            setTimeout(function() {
                $('.error').css('visibility', 'hidden');
            }, 3000)
        }
    };
}());

// Create the controller
ns.controller = (function(m, v) {
    'use strict';

    let model = m,
        view = v,
        $event_pump = $('body'),
        $p_id = $('#p_id'),
        $t_id = $('#t_id');

    // Get the data from the model after the controller is done initializing
    setTimeout(function() {
        model.read();
    }, 100)

    // Validate input
    function validate(p_id, t_id) {
        return p_id !== "" && t_id !== "";
    }

    // Create our event handlers
    $('#create').click(function(e) {
        let p_id = $p_id.val(),
            t_id = $t_id.val();

        e.preventDefault();

        if (validate(p_id, t_id)) {
            model.create(p_id, t_id)
        } else {
            alert('Problem with first or last name input');
        }
    });

    $('#update').click(function(e) {
        let p_id = $p_id.val(),
            t_id = $t_id.val();

        e.preventDefault();

        if (validate(p_id, t_id)) {
            model.update(p_id, t_id)
        } else {
            alert('Problem with first or last name input');
        }
        e.preventDefault();
    });

    $('#delete').click(function(e) {
        let t_id = $t_id.val();

        e.preventDefault();

        if (validate('placeholder', t_id)) {
            model.delete(t_id)
        } else {
            alert('Problem with first or last name input');
        }
        e.preventDefault();
    });

    $('#reset').click(function() {
        view.reset();
    })

    $('table > tbody').on('dblclick', 'tr', function(e) {
        let $target = $(e.target),
            p_id,
            t_id;

        p_id = $target
            .parent()
            .find('td.p_id')
            .text();

        t_id = $target
            .parent()
            .find('td.t_id')
            .text();

        view.update_editor(p_id, t_id);
    });

    // Handle the model events
    $event_pump.on('model_read_success', function(e, data) {
        view.build_table(data);
        view.reset();
    });

    $event_pump.on('model_create_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_update_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_delete_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_error', function(e, xhr, textStatus, errorThrown) {
        let error_msg = textStatus + ': ' + errorThrown + ' - ' + xhr.responseJSON.detail;
        view.error(error_msg);
        console.log(error_msg);
    })
}(ns.model, ns.view));