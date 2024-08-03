const searchInput = document.querySelector("#search-user");
const searchBtn = document.querySelector(".search-btn");
const detailCard = document.querySelector(".details");

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
};

const makeCard = (data) => {
    let {
        avatar_url,
        name,
        login,
        bio,
        public_repos,
        followers,
        following,
        html_url,
        created_at,
    } = data;

    if (!avatar_url) {
        detailCard.innerHTML = `<h3 class = "error">Username not found</h3>`;
    } else {
        let joinedDate = formatDate(created_at);
        detailCard.innerHTML = `<div class="profile">
                    <div class="avatar">
                        <img src="${avatar_url}" alt="">
                    </div>
                    <div class="info">
                        <p class="name">${
                            name ? name : "This profile has no name"
                        }</p>
                        <p class="username">@${login}</p>
                        <p class="join">${joinedDate}</p>
                    </div>
                </div>
                <div class="bio">${bio ? bio : "This profile has no bio"}</div>
                <div class="count">
                    <div class="repos">
                        <h3>Repos</h3>
                        <span>${public_repos}</span>
                    </div>
                    <div class="followers">
                        <h3>Followers</h3>
                        <span>${followers}</span>
                    </div>
                    <div class="following">
                        <h3>Following</h3>
                        <span>${following}</span>
                    </div>
                </div>
                <div class="view">
                    <a href = "${html_url}" target = "_blank">
                    <button id="view-profile">View Profile</button>
                    </a>
                </div>`;
    }
};

const getUser = async (searchUser) => {
    try {
        let response = await fetch(
            `https://api.github.com/users/${searchUser}`
        );
        let data = await response.json();
        makeCard(data);
    } catch (error) {
        console.log(error);
    }
};

searchBtn.addEventListener("click", () => {
    let searchUser = searchInput.value;
    getUser(searchUser);
    searchInput.value = "";
});
