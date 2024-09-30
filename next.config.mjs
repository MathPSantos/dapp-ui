import { createContentlayerPlugin } from "next-contentlayer2";

/** @type {import('next').NextConfig} */
const nextConfig = {};

const withContentLayer = createContentlayerPlugin({});

export default withContentLayer(nextConfig);
