/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    async rewrites(){
        return [
            {
                source: "/hk",
                destination: "/hkdemo"
            },{
                source: "/hk/:path*",
                destination: "/hkdemo/subpage/:path*"
            },
        ]
    }
};

module.exports = nextConfig;
