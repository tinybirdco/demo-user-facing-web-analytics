import dynamic, { LoaderComponent } from "next/dynamic";
import Widget from "./widgets/Widget";
import InView from "./InView";

const enum WidgetHeight {
  XLarge = 588,
  Large = 472,
  Medium = 344,
  Small = 216,
}

function lazyLoadWidget(
  importPromise: () => LoaderComponent,
  loaderSize?: number
) {
  return dynamic(importPromise, {
    loading: () => (
      <Widget>
        <Widget.Content status="loading" loaderSize={loaderSize} />
      </Widget>
    ),
    ssr: false,
  });
}

const KPIsWidget = lazyLoadWidget(() => import("./widgets/KpisWidget"), 80);
const TrendWidget = lazyLoadWidget(() => import("./widgets/TrendWidget"), 40);
const TopPagesWidget = lazyLoadWidget(() => import("./widgets/TopPagesWidget"));
const TopLocationsWidget = lazyLoadWidget(
  () => import("./widgets/TopLocationsWidget")
);
const TopSourcesWidget = lazyLoadWidget(
  () => import("./widgets/TopSourcesWidget")
);
const TopDevicesWidget = lazyLoadWidget(
  () => import("./widgets/TopDevicesWidget")
);
const BrowsersWidget = lazyLoadWidget(() => import("./widgets/BrowsersWidget"));

export default function Widgets() {
  return (
    <div className="grid grid-cols-2 gap-5 sm:gap-10 grid-rows-3-auto">
      <div className="col-span-2" style={{ height: WidgetHeight.XLarge }}>
        <KPIsWidget />
      </div>
      <div className="col-start-1 col-span-2 lg:col-span-1 grid grid-cols-1 gap-5 sm:gap-10 grid-rows-3-auto">
        <InView height={WidgetHeight.Small}>
          <TrendWidget />
        </InView>
        <InView height={WidgetHeight.Large}>
          <TopPagesWidget />
        </InView>
        <InView height={WidgetHeight.Large}>
          <TopLocationsWidget />
        </InView>
      </div>
      <div className="col-start-1 col-span-2 lg:col-start-2 lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5 sm:gap-10 grid-rows-2-auto lg:grid-rows-3-auto">
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <InView height={WidgetHeight.Large}>
            <TopSourcesWidget />
          </InView>
        </div>
        <InView height={WidgetHeight.Medium}>
          <TopDevicesWidget />
        </InView>
        <InView height={WidgetHeight.Medium}>
          <BrowsersWidget />
        </InView>
      </div>
    </div>
  );
}
