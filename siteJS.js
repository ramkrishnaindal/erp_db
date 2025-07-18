const categories = async () => {
  const response = await fetch("https://easihub.com/site.json");
  // Check if the response is successful
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  // Parse the JSON response
  const result = await response.json();
  console.log("Response from server:", result);
  return result;
};

let categoriesList = [];
let showMore = false;
let totalRecords = 0;

let resultTds;
// api.onPageChange(async () => {
let colorCodes = [
  { key: "conference", value: "#007bff" },
  { key: "webinar", value: "#28a745" },
  { key: "seminar", value: "#17a2b8" },
  { key: "workshop", value: "#ffc107" },
  { key: "summit", value: "#6610f2" },
  { key: "meetup", value: "#fd7e14" },
  { key: "roundtable", value: "#6f42c1" },
  { key: "launch event", value: "#e83e8c" },
  { key: "lecture series", value: "#20c997" },
  { key: "bootcamp", value: "#343a40" },
  { key: "technical training", value: "#17a2b8" },
  { key: "panel discussion", value: "#dc3545" },
];
let page_size = 9;
let page_num = 1;

const responseJobsApi = async (data) => {
  try {
    const response = await fetch(
      "https://easihub.com/erp_db/api/erp-collections/jobs",
      {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
        body: JSON.stringify(data), // Convert the data object to a JSON string
      }
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse the JSON response
    const result = await response.json();
    console.log("Response from server:", result);
    return result;
  } catch (error) {
    console.error("Error making POST request:", error);
  }
};
const responseApi = async (data) => {
  try {
    const response = await fetch(
      "https://easihub.com/erp_db/api/erp-collections",
      {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
        body: JSON.stringify(data), // Convert the data object to a JSON string
      }
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse the JSON response
    const result = await response.json();
    console.log("Response from server:", result);
    return result;
  } catch (error) {
    console.error("Error making POST request:", error);
  }
};
const responseApiCount = async (data) => {
  try {
    const response = await fetch(
      "https://easihub.com/erp_db/api/erp-collections/count",
      {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
        body: JSON.stringify(data), // Convert the data object to a JSON string
      }
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse the JSON response
    const result = await response.json();
    console.log("Response from server:", result);
    return +result;
  } catch (error) {
    console.error("Error making POST request:", error);
  }
};

const responseJobsApiCount = async (data) => {
  try {
    const response = await fetch(
      "https://easihub.com/erp_db/api/erp-collections/jobs/count",
      {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
        body: JSON.stringify(data), // Convert the data object to a JSON string
      }
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse the JSON response
    const result = await response.json();
    console.log("Response from server:", result);
    return +result;
  } catch (error) {
    console.error("Error making POST request:", error);
  }
};
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getEventLabelColor(eventType) {
  const findColor = colorCodes.find((x) => x.key === eventType.toLowerCase());
  if (findColor) {
    return findColor.value;
  } else {
    debugger;

    const rgb = hexToRgb(colorCodes[colorCodes.length - 1].value); // default blue
    rgb.r = (rgb.r + 40) % 255;
    rgb.g = (rgb.g + 120) % 255;
    rgb.b = (rgb.b + 200) % 255;
    const hexValue = rgbToHex(rgb.r, rgb.g, rgb.b);
    colorCodes.push({ key: eventType.toLowerCase(), value: hexValue });
    return hexValue;
  }
}

const templateEvent = ({
  title,
  software_name,
  domain_name,
  source_name,
  description,
  author_name,
  start_date,
  end_date,
  event_type,
  url,
  thumbnail_url,
}) => {
  return `
        <tr data-category-id="69" data-notification-level="regular" class="has-description          
                  has-logo">
        <td class="category" style="--category-badge-color: #231f20">
          <div>
            <h3 id="ember1277" class="ember-view">
              <a target="_blank" class="category-title-link" href="${url}">
                
                
                
                <div class="category-logo aspect-image">
                  <div class="event-label" style="background:${getEventLabelColor(
                    event_type || "Event"
                  )};">${event_type || "Event"}</div>
                  <img
                  
                    src="${thumbnail_url}"
                    width="256"
                    height="256"
                    
                    alt=""
                  />
                </div>
                <div class="category-text-title" style="margin:1em 0 0.5em 0;color:rgba(0,0,0,.6);display:flex; font-size:0.8em;">
                  <span 
                    >${domain_name}${"   "}|${"   "}${software_name}</span>
                      
                </div>
                <div style="order:3;font-size:1.2em;">
                  <span class="category-name"
                    ><span
                      ><span
                        class="badge-category__wrapper"
                        style="
                          --category-badge-color: #231f20;
                          --category-badge-text-color: #ffffff;
                        "
                        ><span
                          data-category-id="31"
                          data-drop-close="true"
                          class="badge-category --style-square"
                          title="${description}"
                          ><span class="badge-category__name">${title}</span></span
                        ></span
                      ></span
                    ></span
                  >
                </div>
                
                </a
              >
            </h3>
            
            <div  style="display:flex; font-weight:100;flex-shrink:0;">
              <span style="color:rgb(73, 73, 252);"
                >Start: ${getMomentDate(start_date)}</span>
                  
            </div>
            <div  style="display:flex; font-weight:100;flex-shrink:0;">
              <span style="color:rgb(73, 73, 252);"
                >End: ${getMomentDate(end_date)}</span>
                  
            </div>
          </div>
            <div class="category-description">
              <span
                >${description}</span
              >
            
            </div>   
            
            <div style="display: flex; justify-content: space-between;margin-right:1em;">        
              <div class="category-description" style="margin-bottom:0;font-weight:700"> ${source_name}</div>   
              <div class="category-description" style="margin-bottom:0">|</div>   
              <div class="category-description" style="margin-bottom:0"> ${author_name}</div>   
              <button id="social" style="color:rgb(73, 73, 252)"><i class="fas fa-share-alt"></i></button>
              </div>
          </td></tr>
        `;
};

const templateJob = ({
  _id,
  job_title,
  company_name,
  job_location,
  employment_type,
  benefits,
  apply_url,
}) => {
  const benefitsList = benefits.map((x) => {
    return `<div class="tag">${x}</div>`;
  });
  return `

        <tr data-category-id="69" data-notification-level="regular" class="has-description          
                  has-logo">
                  
        <td class="category" style="--category-badge-color: #231f20">
          <a href="/jobdetails?id=${_id}" target="_blank">
          <div class="job-card">
            <div class="company-logo">
              D
            </div>
            <div class="job-details">
              <div class="job-title">${job_title}</div>
              <div class="company-name">${company_name}</div>
              <div class="job-location">${job_location}</div>

              <div class="job-meta">
                <div class="tag">Contract</div>
                <div class="tag work-mode">${employment_type}</div>
                ${benefitsList.join("")}
              </div>
            </div>
            <a href="${apply_url}" target="_blank"><button class="apply-btn">Quick Apply</button></a>
          </div>
        </a>
          </td></tr>
        `;
};

const templateArticle = ({
  title = "Article Title",
  software_name,
  domain_name,
  source_name,
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo iure autem reiciendis tenetur. Eaque placeat adipisci officiis facere commodi non corporis veniam repellat nesciunt, quasi neque dolore labore voluptatibus laborum.",
  author_name = "John Doe",
  topic_date = "2023-10-01",
  url = "https://easihub.com/tags/c/plm-product-lifecycle-management/generic-plm-topics/1581/articles",
  thumbnail_url,
}) => {
  return `
      <tr data-category-id="69" data-notification-level="regular" class="has-description          
                has-logo">
      <td class="category" style="--category-badge-color: #231f20">
          <h3 id="ember1277" class="ember-view">
            <a target="_blank" class="category-title-link" href="${url}">
              
              
              
              <div class="category-logo aspect-image">
                <img
                
                  src="${thumbnail_url}"
                  width="256"
                  height="256"
                  
                  alt=""
                />
              </div>
              <div class="category-text-title" style="margin:1em 0 0.5em 0;color:rgba(0,0,0,.6);display:flex; font-size:0.8em;">
                <span 
                  >${domain_name}${"   "}|${"   "}${software_name}</span>
                    
              </div>
              <div style="order:3;font-size:1.2em;">
                <span class="category-name"
                  ><span
                    ><span
                      class="badge-category__wrapper"
                      style="
                        --category-badge-color: #231f20;
                        --category-badge-text-color: #ffffff;
                      "
                      ><span
                        data-category-id="31"
                        data-drop-close="true"
                        class="badge-category --style-square"
                        title="${description}"
                        ><span class="badge-category__name">${title}</span></span
                      ></span
                    ></span
                  ></span
                >
              </div>
              <div class="category-text-title" style="margin:0 0 0.5em 0;display:flex; font-size:0.8em; order:2;">
                <span style="color:rgb(0,220,220);"
                  >${getMomentDate(topic_date)}</span>
                    
              </div>
              </a
            >
          </h3>

          <div class="category-description">
            <span
              >${description}</span
            >
          
          </div>   
          
          <div style="display: flex; justify-content: space-between;margin-right:1em;">        
            <div class="category-description" style="margin-bottom:0;font-weight:700"> ${source_name}</div>   
            <div class="category-description" style="margin-bottom:0">|</div>   
            <div class="category-description" style="margin-bottom:0"> ${author_name}</div>   
            <button id="social" style="color:rgb(73, 73, 252)"><i class="fas fa-share-alt"></i></button>
            </div>
        </td></tr>
      `;
};

const resultHtml = (tds) => `
<div id="list-area">
      <div class="contents">
      <div class="ember-view">
<table class="category-list ">
  <thead>
      <tr>
          <th class="category"><span role="heading" aria-level="2" id="categories-only-category">Hub</span></th>
          <th class="topics">Topics</th>
          </tr>
      </thead>
<tbody id="custom-tbody" aria-labelledby="categories-only-category">

  ${tds ? tds : ""}
  
</tbody>
</table>
<div>${
  showMore === true
    ? `
  <div id="showMoreDiv"><button id="showMore">Show More...</button></div>
  `
    : ""
}
  </div>

</div></div></div>
`;
const resultJobsHtml = (tds) => `
<div id="list-area">
      <div class="contents">
      <div class="ember-view">
<table class="category-list ">
  <thead>
      <tr>
          <th class="category"><span role="heading" aria-level="2" id="categories-only-category">Hub</span></th>
          <th class="topics">Topics</th>
          </tr>
      </thead>
<tbody id="custom-tbody-jobs" aria-labelledby="categories-only-category">

  ${tds ? tds : ""}
  
</tbody>
</table>
<div>${
  showMore === true
    ? `
  <div id="showMoreDiv"><button id="showMore">Show More...</button></div>
  `
    : ""
}
  </div>

</div></div></div>
`;
const getSubCategory = () => {
  const pathArr = //window.location.pathname.split(
    //`https://easihub.com/tags/c/plm-product-lifecycle-management/teamcenter/686/jobs`.split(
    `https://easihub.com/tags/c/plm-product-lifecycle-management/teamcenter/686/articles`.split(
      "/"
    );
  //window.location.path
  return {
    subcategoryid: +pathArr[pathArr.length - 2],
    topic_type: pathArr[pathArr.length - 1],
    software_name: "",
  };
};
const getCategoryName = async ({
  subcategoryid,
  topic_type,
  software_name,
}) => {
  let domain_name;

  const subcat = categoriesList.find((x) => x.id == subcategoryid);
  domain_name = subcat?.name;
  if (subcat) {
    if (subcat.parent_category_id) {
      return await getCategoryName({
        subcategoryid: +subcat.parent_category_id,
        topic_type,
        software_name: domain_name,
      });
    }
    // catName = categories.find((x) => x.id == subcat.parent_category_id)?.name;
    return {
      domain_name,
      software_name,
      topic_type,
    };
  } else {
    return "";
  }
};
const templateBulletin = ({
  title = "Article Title",
  software_name,
  version_name,
  domain_name,
  source_name,
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo iure autem reiciendis tenetur. Eaque placeat adipisci officiis facere commodi non corporis veniam repellat nesciunt, quasi neque dolore labore voluptatibus laborum.",
  author_name = "John Doe",
  release_date = "2023-10-01",
  topic_date,
  url = "https://easihub.com/tags/c/plm-product-lifecycle-management/generic-plm-topics/1581/articles",
  thumbnail_url,
}) => {
  return `
        <tr data-category-id="69" data-notification-level="regular" class="has-description          
                  has-logo">
        <td class="category" style="--category-badge-color: #231f20">
            <h3 id="ember1277" class="ember-view">
              <a target="_blank" class="category-title-link" href="${url}">
                
                
                
                <div class="category-logo aspect-image">
                  <img                  
                    src="${thumbnail_url}"
                    width="256"
                    height="256"
                    
                    alt=""
                  />
                </div>
                <div class="category-text-title" style="margin:1em 0 0.5em 0;color:rgba(0,0,0,.6);display:flex; font-size:0.8em;">
                  <span 
                    >${domain_name}${"   "}|${"   "}${software_name}</span>
                      
                </div>
                <div style="order:3;font-size:1.2em;">
                  <span class="category-name"
                    ><span
                      ><span
                        class="badge-category__wrapper"
                        style="
                          --category-badge-color: #231f20;
                          --category-badge-text-color: #ffffff;
                        "
                        ><span
                          data-category-id="31"
                          data-drop-close="true"
                          class="badge-category --style-square"
                          title="${description}"
                          ><span class="badge-category__name">${title}</span></span
                        ></span
                      ></span
                    ></span
                  >
                </div>
                <div class="category-text-title" style="margin:0 0 0.5em 0;display:flex; font-size:0.8em; order:2;">
                  <span style="color:rgb(0,220,220);"
                    >${getMomentDate(topic_date)}</span>
                      
                </div>
                </a
              >
            </h3>
            <div>
            <div  style="display:flex; font-weight:100;flex-shrink:0;">
              <span style="color:rgb(73, 73, 252);"
                >${version_name}</span>
                  
            </div>
            <div  style="display:flex; font-weight:100;flex-shrink:0;">
              <span style="color:rgb(73, 73, 252);"
                >Release Date: ${getMomentDate(release_date)}</span>
                  
            </div>
            </div>
            <div class="category-description">
              <span
                >${description}</span
              >
            
            </div>   
            
            <div style="display: flex; justify-content: space-between;margin-right:1em;">        
              <div class="category-description" style="margin-bottom:0;font-weight:700"> ${source_name}</div>   
              <div class="category-description" style="margin-bottom:0">|</div>   
              ${
                author_name.length
                  ? `<div class="category-description" style="margin-bottom:0;width: 100px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;"> ${author_name}</div>`
                  : ""
              }   
              <button id="social" style="color:rgb(73, 73, 252)"><i class="fas fa-share-alt"></i></button>
              </div>
          </td></tr>
        `;
};
const displayResults = async (results, page_size) => {
  results.page_num = page_num;
  results.page_size = page_size;
  const filtered = await responseApi(results);
  console.log("filtered", filtered);

  if (page_num == 1) {
    resultTds = ``;
  }
  if (filtered?.length) {
    filtered.forEach((x) => {
      switch (x.topic_type) {
        case "events":
          resultTds += templateEvent(x);
          break;
        case "articles":
          resultTds += templateArticle(x);
          break;
        case "bulletins":
          resultTds += templateBulletin(x);
          break;
      }
    });

    if (totalRecords > results.page_size * page_num) showMore = true;
    else showMore = false;
    const resultsToDisplay = resultHtml(resultTds);
    console.log(resultsToDisplay);
    //setTimeout(() => {

    // alert(document.querySelector("li[title='Articles']"));
    // if (document.querySelector("li[title='Articles']")) {
    //   const html = resultsToDisplay;

    //   const elements = document.querySelectorAll(
    //     ".container.list-container div.row"
    //   );
    //   if (elements.length) {
    //     elements[elements.length - 1].innerHTML = html;
    //   }
    // }
  }
};
const displayJobResults = async (results, page_size) => {
  results.page_num = page_num;
  results.page_size = page_size;
  const filtered = await responseJobsApi(results);
  console.log("filtered", filtered);

  if (page_num == 1) {
    resultTds = ``;
  }
  if (filtered?.length) {
    filtered.forEach((x) => {
      resultTds += templateJob(x);
    });

    if (totalRecords > results.page_size * page_num) showMore = true;
    else showMore = false;
    const resultsToDisplay = resultJobsHtml(resultTds);
    console.log(resultsToDisplay);
    //setTimeout(() => {

    // alert(document.querySelector("li[title='Articles']"));
    // if (document.querySelector("li[title='Jobs']")) {
    //   const html = resultsToDisplay;

    //   const elements = document.querySelectorAll(
    //     ".container.list-container div.row"
    //   );
    //   if (elements.length) {
    //     elements[elements.length - 1].innerHTML = html;
    //   }
    // }
  }
};
(async () => {
  try {
    // social share dialog
    // document.body.addEventListener("click", function (event) {
    //   if (event.target.id == "showMore") {
    //     (async () => {
    //       const urlParams = getSubCategory();
    //       // debugger
    //       const results = await getCategoryName(urlParams);
    //       if (!results.software_name) {
    //         results.software_name = results.domain_name;
    //       }
    //       page_num = page_num + 1;
    //       //if (totalRecords > (page_size) * page_num) showMore = true;
    //       await displayJobResults(results, page_size);
    //     })();
    //   }
    // });
    // // //clear the previous results
    // if (document.querySelector("li[title='Articles']")) {
    //   const elements = document.querySelectorAll(
    //     ".container.list-container div.row"
    //   );
    //   if (elements.length) {
    //     elements[elements.length - 1].innerHTML = "";
    //   }
    // }
    if (categoriesList.length === 0) {
      // Fetch categories only once
      categoriesList = (await categories()).categories;
    }
    const urlParams = getSubCategory();
    debugger;
    const results = await getCategoryName(urlParams);
    if (!results.software_name) {
      results.software_name = results.domain_name;
    }
    if (results.topic_type === "jobs") {
      totalRecords = await responseJobsApiCount(results);
      await displayJobResults(results, page_size);
    } else {
      totalRecords = await responseApiCount(results);
      await displayResults(results, page_size);
    }
    console.log("totalRecords", totalRecords);
    //Actual logic
  } catch (error) {
    console.log("error", error);
  }
})();
// });
