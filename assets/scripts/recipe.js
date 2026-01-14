
const hours_and_minutes_str = function(date_obj) {
    s = "";

    const h = date_obj.getHours();
    const m = date_obj.getMinutes();

    if (h > 0) {
        plural = "";
        if (h != 1) {
            plural = "s";
        }

        s += `${h} hour${plural}`;

        s += " and ";
    }

    plural = "";
    if (m != 1) {
        plural = "s";
    }
    s += `${m} minute${plural}`;

    return s;
}

const timer_str = function(seconds) {
    str = "";

    seconds = Math.floor(seconds / 1000);
    const s = seconds % 60;
    seconds = Math.floor(seconds / 60);
    const m = seconds % 60;
    seconds = Math.floor(seconds / 60);
    const h = seconds;

    str += `${h}:`;

    if (m > 9) {
        str += `${m}:`
    }
    else if (m > 0) {
        str += `0${m}:`;
    }
    else {
        str += "00:";
    }

    if (s > 9) {
        str += `${s}`
    }
    else if (s > 0) {
        str += `0${s}`;
    }
    else {
        str += "00";
    }

    return str;
}

const timer_starts = {};
const timer_vals = {};
const timer_elements = {};
const timer_callbacks = {};
const timer_increments = {};

const set_timer_increment = function(id, incr) {
    timer_increments[id] = incr;
}

const increment_timer_function = function() {
    for (const id of Object.keys(timer_starts)) {

        var postfix = "";

        // get timer text element
        if (!(id in timer_elements)) {
            console.log(`getting element ${id}-timer`);
            timer_elements[id] = document.getElementById(`${id}-timer`);
        }

        // reset or increment
        if (timer_increments[id] > 0) {
            timer_vals[id] = timer_starts[id];
        }
        else {
            timer_vals[id] += timer_increments[id];
        }

        // stop timer at end
        if (timer_vals[id] <= 0) {
            // play completion sound
            if (timer_increments[id] < 0) {
                // TODO
                console.log("Timer complete");
            }

            postfix = "Done!";
            timer_vals[id] = 0;
            timer_increments[id] = 0;
        }

        const string = timer_str(timer_vals[id]);
        timer_elements[id].innerHTML = `${string} ${postfix}`

    }
}

const generate_recipe_html = function(document, recipe) {
    const recipe_element = document.getElementById("recipe");
    html = "";

    // name
    html += `<p>This recipe, ${recipe.name}, is best for ${recipe.meal}.</p>`;

    // duration
    html += `<p>Approximate duration: ${hours_and_minutes_str(recipe.duration)}</p>`;

    html += `<ol>`;
    i = 0;
    for (const step of recipe.steps) {
        const id = `step${i}`

        html += `<li>`;

        // step completion checkbox
        html += `<input type="checkbox" id="${id}" name="${id}" value="Yes"> `;

        // step timer
        if (step.time) {
            html += `<input type="button" id="${id}-start" name="${id}-start" value="Start timer!" onclick="set_timer_increment('${id}', -1000)">`;
            html += `<input type="button" id="${id}-start" name="${id}-pause" value="Pause timer!" onclick="set_timer_increment('${id}', 0)">`;
            html += `<input type="button" id="${id}-start" name="${id}-reset" value="Reset timer!" onclick="set_timer_increment('${id}', 1000)">`;
            html += `<label id="${id}-timer" class="duration"></label>`;

            // log timer metadata
            timer_starts[id] = step.time.getTime();
            timer_vals[id] = timer_starts[id];
            timer_increments[id] = 1000;
            timer_callbacks[id] = increment_timer_function;
        }

        // step text
        html += `<p><label for="${id}">${step.text}</label>`;

        // step sublist
        if (step.list) {
            html += `<ul>`;

            j = 0;
            for (const item of step.list) {
                html += `<li><input type="checkbox" id="${id}-${j}"><label for="${id}-${j}">${item}</label></li>`
                j += 1
            }
            html += ` `;

            html += `</ul>`;
        }

        html += `</p>`;

        html += `</li>`;
        i += 1;
    }
    html += `</ol>`;

    if (recipe.origin) {
        html += `<p>Originally from: ${recipe.origin}</p>`;
    }

    recipe_element.innerHTML = html;

    // start timer
    setInterval(increment_timer_function, 1000);
};

const set_timer = function(date_obj) {

};

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    const s = urlParams.get("recipe");
    console.log(s);

    element = document.getElementById("recipe");
    element.innerHTML = `<p>This recipe is ${s}</p>`;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `/le-ricette/media/recipes/${s}.js`;
    script.onload = function() {
        const recipe_obj = get_recipe();
        generate_recipe_html(document, recipe_obj);
    };

    document.head.appendChild(script);
};
