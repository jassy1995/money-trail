export const timeFormatter = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
};

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0)?.toUpperCase() + string?.slice(1);
}

function compareTheSortingKey(a, b) {
    const firstpath = a.firstname.toLowerCase();
    const secondpath = b.firstname.toLowerCase();

    if (firstpath < secondpath) {
        return -1;
    } else if (firstpath > secondpath) {
        return 1;
    } else {
        return 0;
    }
}

export const sortAlphabetically = (item_array) => {
    const sortedArray = item_array.slice().sort(compareTheSortingKey);
    return sortedArray
}

export const apps = [
    {
        id: 1,
        name: "client connect",
    },
    {
        id: 2,
        name: "clan pay",
    },
    {
        id: 3,
        name: "omni",
    },
    {
        id: 4,
        name: "get440",
    },
    {
        id: 5,
        name: "wallet",
    },
    {
        id: 6,
        name: "access control",
    }
]

export const users = [
    {
        id: 1,
        img: "https://media.licdn.com/dms/image/D4D03AQETLQOW-trsNw/profile-displayphoto-shrink_100_100/0/1666897707993?e=1693440000&v=beta&t=KHKyzbhAJRzSXzU0mjlfmSaYXi8XBxBgryZNTB1yLyY",
        name: "babatunde joseph",
        phone: "08143274300",
        email: "joseph.babatunde@clan.africa"
    },
    {
        id: 2,
        img: "https://media.licdn.com/dms/image/C4E03AQFKA7IN11yFGQ/profile-displayphoto-shrink_100_100/0/1653551993661?e=1693440000&v=beta&t=qUBdLzuC_alaTebU7XRjdMbXMBwTU0AsygBTc5VNFYI",
        name: "kennedy joseph",
        phone: "08145745744",
        email: "joseph.kennedy@clan.africa"
    },
    {
        id: 3,
        img: "https://media.licdn.com/dms/image/D4D03AQGtkSbrq0KIcg/profile-displayphoto-shrink_100_100/0/1673956558835?e=1693440000&v=beta&t=82-uHWiSBuF92JcU-FDy6LiL0Lb8oaShDtqLDo7Kmuo",
        name: "Francis jude",
        phone: "08188336366",
        email: "jude.francis@clan.africa"
    },
    {
        id: 4,
        img: "https://media.licdn.com/dms/image/C4D03AQE9813F13OmWA/profile-displayphoto-shrink_100_100/0/1648132859188?e=1693440000&v=beta&t=w2itlT3WkiGOM2t2ZVEJEDY_EAfbgRGYNS5YInRt9fk",
        name: "oyegbile praise",
        phone: "081092342424",
        email: "praise.oyegbile@clan.africa"
    },
    {
        id: 5,
        img: "https://media.licdn.com/dms/image/D4D03AQHnLgYkqxpVIg/profile-displayphoto-shrink_100_100/0/1682854336747?e=1693440000&v=beta&t=Ci1HR3g2KBaxZjcHLOge_N6PtzWlzR-F6wdiD-X41rc",
        name: "steve ogee",
        phone: "08133443366",
        email: "steve.ogee@clan.africa"
    },
]
