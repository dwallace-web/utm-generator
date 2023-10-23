generate.addEventListener('click', makeLinks);

let adsizearr = ['',];

let url = document.getElementById('url')
let campaign = document.getElementById('campaign')
let source = document.getElementById('source')
let medium = document.getElementById('medium')
let creative = document.getElementById('creative')
let outputs = document.getElementById('utm-outputs')

let square = document.getElementById('300x250');
let leaderboard = document.getElementById('728x90');
let mobileone = document.getElementById('300x250');
let mobiletwo = document.getElementById('300x250');

let checkboxes = document.querySelectorAll('input[type="checkbox"]');

let campaign_url_table = document.getElementById('campaign-url-table')

let request_no = 0

let urls = []

checkboxes.forEach(x => {
    x.addEventListener('change', (event) => {
        if (event.target.checked) {
            if(!adsizearr.includes(event.target.value)){
                adsizearr.push(event.target.value)
            }
        }
        if (event.target.unchecked) {
            adsizearr.filter(event.target.value)
            console.log(adsizearr)
        }
    });
})

function makeLinks(e) {

    e.preventDefault();

    let base_campaign_string, new_link, creative_details, src_link, request_id

    input_url = url.value;
    if(input_url.substr(0,7) !== ("http://" || "https://")){
        input_url = "https://"+input_url;
    }

    adsizearr.map(x => {
        request_no += 1
        
        base_campaign_string = input_url + "?utm_campaign=" + encodeURIComponent(campaign.value) + "&utm_source=" + encodeURIComponent(source.value) + "&utm_medium=" + encodeURIComponent(medium.value)

        let content = encodeURIComponent(creative.value)

        if (content) {
            creative_details = "&utm_content=" + content 
            //ternary for ad sizing
                x !== '' ? creative_details += "-" + x : null
            base_campaign_string+=creative_details
            urls.push(base_campaign_string)
        }

        new_link = document.createElement('tr');
        new_link.className = 'border-b border-gray-600'

        request_id = document.createElement('td');
        request_id.className = 'py-2 px-4'
        request_id.textContent = `${request_no}`

        requested_link = document.createElement('td');
        requested_link.className = 'py-2 px-4'

        
        src_link = document.createElement('a')
        src_link.setAttribute('href', base_campaign_string)
        src_link.setAttribute('target', '_blank')
        src_link.textContent = base_campaign_string
        requested_link.appendChild(src_link)
        
        new_link.appendChild(request_id)
        new_link.appendChild(requested_link)

        outputs.appendChild(new_link)
        
    })
}