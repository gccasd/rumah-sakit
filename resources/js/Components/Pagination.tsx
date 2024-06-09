import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

export function Pagination(props: {
  totalPage: number | any;
  pageNow: number;
  url: string;
  onPageChange: (newPage: number) => void | null
}) {
  const [active, setActive] = useState<number>(props.pageNow);

  useEffect(() => {
    console.log("props.pageNow:", props.pageNow);
    setActive(props.pageNow);
  }, [props.pageNow]);

  const getItemProps = (index: number) =>
    ({
      className: `rounded-full ${
        active === index ? "bg-blue-500 text-white" : "text-gray-500"
      }`,
      onClick: () => {
        setActive(index);
        props.onPageChange(index); // Call onPageChange prop
        router.get(props.url, {
          page: index,
        }, {
            preserveState: true
        });
      },
    } as any);

  const next = () => {
    if (active === props.totalPage) return;
    const nextActive = active + 1;
    props.onPageChange(nextActive); // Call onPageChange prop
    setActive(prevActive => prevActive + 1);
    router.get(props.url, {
      page: nextActive,
    }, {
        preserveState: true
    });
  };

  const prev = () => {
    if (active === 1) return;
    const prevActive = active - 1;
    setActive(prevActive => prevActive - 1);
    props.onPageChange(prevActive); // Call onPageChange prop
    router.get(props.url, {
      page: prevActive,
    }, {
        preserveState: true
    });
  };

  return (
    <div className="flex items-center gap-4 text-lg">
      <button
        className={`flex items-center gap-2 rounded-full px-2 ${
          active === 1 ? "bg-gray-200 cursor-not-allowed" : ""
        }`}
        onClick={prev}
        disabled={active === 1}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          strokeWidth={2}
          className="h-4 w-4"
        />{" "}
        Previous
      </button>
      <div className="flex items-center gap-4">
        {[...Array(props.totalPage).keys()].map((i) => (
          <button
            key={i + 1}
            style={{ padding: "8px 16px" }} // Misalnya, menambahkan padding vertikal 8px dan padding horizontal 16px
            className={`rounded-full ${
              active === i + 1 ? "bg-blue-500 text-white" : "text-gray-500"
            }`}
            {...getItemProps(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        className={`flex items-center gap-2 rounded-full px-2 ${
          active === props.totalPage ? "bg-gray-200 cursor-not-allowed" : ""
        }`}
        onClick={next}
        disabled={active === props.totalPage}
      >
        Next
        <FontAwesomeIcon
          icon={faArrowRight}
          strokeWidth={2}
          className="h-4 w-4"
        />
      </button>
    </div>
  );
}
