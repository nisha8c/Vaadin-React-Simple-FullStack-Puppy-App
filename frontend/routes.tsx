import ContactsView from 'Frontend/views/contacts/ContactsView.js';
import MainLayout from 'Frontend/views/MainLayout.js';
import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import PuppyInfo from "Frontend/views/puppy/PuppyInfo";
import {EditPuppy} from "Frontend/views/puppy/EditPuppy";
import AddPuppy from "Frontend/views/puppy/AddPuppy";
import RcsView from "Frontend/views/rcsView/RcsView";

const AboutView = lazy(async () => import('Frontend/views/about/AboutView.js'));
const PuppyList = lazy(async () => import('Frontend/views/puppy/PuppyList.js'));

export const routes = [
  {
    element: <MainLayout />,
    handle: { title: 'Hilla CRM' },
    children: [
      { path: '/', element: <ContactsView />, handle: { title: 'Contacts' } },
      { path: '/about', element: <AboutView />, handle: { title: 'About' } },
      { path: '/puppies', element: <PuppyList />, handle: { title: 'Puppies' } },
      { path: '/puppies/:id', element: <PuppyInfo />, handle: { title: 'Puppy Info' } },
      { path: '/puppies/:id/edit', element: <EditPuppy />, handle: { title: 'Edit Puppy Info' } },
      { path: '/add', element: <AddPuppy />, handle: { title: 'Add new puppy' } },
      { path: '/rcsView', element: <RcsView />, handle: { title: 'RCS' } },
    ],
  },
] as RouteObject[];

export default createBrowserRouter(routes);
