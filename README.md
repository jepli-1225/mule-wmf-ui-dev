## Quickstart

First, install dependencies:
```CMD
npm i
npm install node-cache react-query sequelize-simple-cache --save
```

Ensure that you are connected to the mulesoft-wmf-dev MSSQL Database.

Then, run the development server:

```CMD
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

##

## Data Fetching

### Hook

Currently, the data fetching implementation is similar for most pages which is why a custom `useFetchData` hook is implemented.

However, it does not handle race conditions that can occur with rapid search parameter changes. 

As of now, using debouncing helps prevent excessive API calls but if more complex filtering is needed, consider request cancellation.

```Javascript
  const controller = new AbortController();
```

### Caching

Caching has been implemented only for pages with infrequent updates to their respective database tables. (ie. domain & notification config)

While NextJS offers caching for API routes, I did not use it as I think in-memory caching is fast and can give more control especially when the database is large.

### API Route

API Routing was implemented for scalability and is easily usable in NextJS. I suggest keeping API Routes as it provides flexibility for future changes.

Might want to look into API Gateways.

## Role Based Auth

This allows for different access based on a user's primary role. For example, the admin can give other users permission to replay or view an inbound event. 

This would be expanded to allowing admins to give certain users admin access as well.

Currently, I extended the default Next-Auth types to include roles, however you might want to integrate roles with the identity providers themselves. I suggest keeping the primary roles for base-level management but you could expand it to be more hierarchical for better real-world management.

### Security

Admin access is currently checked on the page itself but I suggest implementing authentication middleware to protect this route instead.

## Sequelize

Easy to use and would recommend keeping as our ORM and creating models for new tables as needed. However, I recommend using Sequelize Auto to generate models from existing database tables to not miss information. 
