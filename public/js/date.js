	'use strict';

		$(function () {
		    'use strict';

		    $('#singleDateRange').DatePicker({
		        startDate: moment()
		    });

		    $('#rangedate').DatePicker({
		        type: 'rangedate',
		    startDate: moment().subtract(1, 'date'),
		    endDate: moment(),
		    ranges: []
				});
				
		});
