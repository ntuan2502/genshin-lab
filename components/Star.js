export function YellowStar() {
    return (
        <span className="text-amberStarYellow drop-shadow-special filter">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className="h-4 w-4 fill-current lg:h-5 lg:w-5"
            >
                <path d="M381.2 150.3l143.7 21.2c11.9 1.7 21.9 10.1 25.7 21.6 3.8 11.6.7 24.2-7.9 32.8L438.5 328.1l24.6 146.6c2 12-2.9 24.2-12.9 31.3-9.9 7.1-23 8-33.7 2.3l-128.4-68.5-128.3 68.5c-10.8 5.7-23.9 4.8-33.8-2.3-9.9-7.1-14.9-19.3-12.8-31.3l24.6-146.6L33.58 225.9c-8.61-8.6-11.67-21.2-7.89-32.8 3.77-11.5 13.74-19.9 25.73-21.6L195 150.3l64.4-132.33C264.7 6.954 275.9-.04 288.1-.04c12.3 0 23.5 6.994 28.8 18.01l64.3 132.33z"></path>
            </svg>
        </span>
    );
}
export function Star({ number }) {
    if (number == 1) return <YellowStar />;
    else if (number == 2)
        return (
            <>
                <YellowStar />
                <YellowStar />
            </>
        );
    else if (number == 3)
        return (
            <>
                <YellowStar />
                <YellowStar />
                <YellowStar />
            </>
        );
    else if (number == 4)
        return (
            <>
                <YellowStar />
                <YellowStar />
                <YellowStar />
                <YellowStar />
            </>
        );
    else if (number == 5)
        return (
            <>
                <YellowStar />
                <YellowStar />
                <YellowStar />
                <YellowStar />
                <YellowStar />
            </>
        );
    else
        return (
            <>
                <YellowStar />
                <YellowStar />
                <YellowStar />
                <YellowStar />
                <YellowStar />
            </>
        );
}
