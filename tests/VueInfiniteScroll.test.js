import { mount } from "@vue/test-utils";
import setupIntersectionObserverMock from './mocks/IntersectionObserverMock';
import VuePaginateScroll from "../src/VuePaginateScroll";

setupIntersectionObserverMock();


describe('VuePaginateScroll', () => {
  const data = [
    { name: 'Luca', email: 'luca@mail.com', age: 20},
    { name: 'Andrea', email: 'test@mail.com', age: 40},
    { name: 'Massimo', email: 'test@mail.com', age: 23},
    { name: 'Matteo', email: 'test@mail.com', age: 50},
    { name: 'Angela', email: 'test@mail.com', age: 22},
    { name: 'Ludovica', email: 'test@mail.com', age: 25},
    { name: 'Lucia', email: 'test@mail.com', age: 25},
    { name: 'Mario', email: 'test@mail.com', age: 33},
    { name: 'Mirco', email: 'test@mail.com', age: 29},
    { name: 'Enrico', email: 'test@mail.com', age: 21},
    { name: 'Eva', email: 'test@mail.com', age: 22},
    { name: 'Michela', email: 'test@mail.com', age: 23},
    { name: 'Michele', email: 'test@mail.com', age: 24},
    { name: 'Sara', email: 'test@mail.com', age: 26},
    { name: 'Eugenio', email: 'test@mail.com', age: 22},
    { name: 'Anna', email: 'test@mail.com', age: 12},
  ];

  const wrapperOptions = {
    propsData: {
      src: data,
      perScroll: 5
    },
    scopedSlots: {
      default: `<template slot-scope="{ data }"> 
        <ul>
          <li v-for="(item,i) in data" :key="i">{{ item.name }}</li>
        </ul>
      </template>`,
    }
  };

  const wrapper = mount(VuePaginateScroll, wrapperOptions);

  it('renders one div with vue-infinite-scroll class', () => {
    expect(wrapper.classes()).toContain('vue-infinite-scroll')
  });

  it('starts with first five elements in the src Array', () => {
    expect(wrapper.vm.$data.data.length).toBe(5);
  });

  it('prints 5 li elements with the data.name prop', () => {
    const list = wrapper.findAll('.vue-infinite-scroll__content ul li');
    expect(list.length).toBe(5);
    for(let i = 0; i < 5; i++){
      expect(list.at(i).text()).toBe(wrapperOptions.propsData.src[i].name);
    }
  });

  it('add new data chunk to data when scroll', () => {
    //calling the method addNextChunk simulates the "scroll"
    wrapper.vm.addNextChunk();
    expect(wrapper.vm.$data.data.length).toBe(10);
  });

  it('prints new 5 chunks with the data.name prop', () => {
    const list = wrapper.findAll('.vue-infinite-scroll__content ul li');
    expect(list.length).toBe(10);

    for(let i = 5; i < 10; i++){
      expect(list.at(i).text()).toBe(wrapperOptions.propsData.src[i].name);
    }
  });
});