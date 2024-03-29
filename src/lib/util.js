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

export const isoTimeFormater = (isoDate) => {
    const date = new Date(isoDate);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

}

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

// trunk-ignore(gitleaks/generic-api-key)
export const apiKey = "WE4mwadGYqf0jv1ZkdFv1LNPMpZHuuzoDDiJpQQqaes3PzB7xlYhe8oHbxm6J228"

export const getRequest = (data, id) => {
    if (Array.isArray(data) && data.length) {
        return data.find(x => +x.REQUEST_ID === +id)
    }
}
export const generateFullName = (firstName, lastName) => {
    if (!firstName && !lastName) {
        return 'friend';
    } else if (!firstName || !lastName) {
        return (firstName || lastName).charAt(0).toUpperCase() + (firstName || lastName).slice(1).toLowerCase();
    } else {
        const formattedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
        const formattedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
        return `${formattedFirstName} ${formattedLastName}`;
    }
};
export const getStatus = (status) => {
    if (status === '0') return 'pending';
    if (status === '1') return 'approved';
    if (status === '-1') return 'rejected';
    else return '';
}
export const shorttenUrl = (fileUrl) => {
    const removed = fileUrl.slice(0, 25);
    return `${removed}...`
}
export const adminIds = ['08143274300', '09062827907', '08118124911', '08132846529', '08160026961', '08037546654'];
export const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
    }).format(+value);
}
export const removeKobo = (currency) => {
    const koboPart = currency.slice(-3);
    if (koboPart === '.00') {
        return currency.slice(0, -3);
    } else {
        return currency;
    }
}
