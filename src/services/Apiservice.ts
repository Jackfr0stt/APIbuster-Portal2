import axios from 'axios';
import { wrapper } from "../utils/wrapper";
import { API_URL } from '../config';

export default class ApiService {
  async getAPIs(filter?: any) {
    let route: string = "";

    if (filter) {
      route = `${API_URL}/apis?where=${encodeURI(JSON.stringify(filter))}`;
    } else {
      route = `${API_URL}/apis`;
    }
    const response = await wrapper(
      axios.get(route)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async getAPIById(id: number) {
    const response = await wrapper(
      axios.get(`${API_URL}/apis/${id}`)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async newAPI(body: any) {
    const route = `${API_URL}/apis`;

    const response = await wrapper(
      axios.post(route, body)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async delAPI(id: number) {
    const route = `${API_URL}/apis/${id}`;

    const response = await wrapper(
      axios.delete(route)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async getEndpoints(filter?: any) {
    let route: string = "";

    if (filter) {
      route = `${API_URL}/endpoints?where=${encodeURI(JSON.stringify(filter))}`;
    } else {
      route = `${API_URL}/endpoints`;
    }
    const response = await wrapper(
      axios.get(route)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async getEndpointById(id: number) {
    const response = await wrapper(
      axios.get(`${API_URL}/endpoints/${id}`)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async newEndpoint(body: any) {
    const route = `${API_URL}/endpoints`;

    const response = await wrapper(
      axios.post(route, body)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async delEndpoint(id: number) {
    const route = `${API_URL}/endpoints/${id}`;

    const response = await wrapper(
      axios.delete(route)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async getTestgroups(filter?: any) {
    let route: string = "";

    if (filter) {
      route = `${API_URL}/testgroups?where=${encodeURI(JSON.stringify(filter))}`;
    } else {
      route = `${API_URL}/testgroups`;
    }
    const response = await wrapper(
      axios.get(route)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async getTestgroupById(id: number) {
    const response = await wrapper(
      axios.get(`${API_URL}/testgroups/${id}`)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async newTestgroup(body: any) {
    const route = `${API_URL}/testgroups`;

    const response = await wrapper(
      axios.post(route, body)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async delTestgroup(id: number) {
    const route = `${API_URL}/testgroups/${id}`;

    const response = await wrapper(
      axios.delete(route)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async getTests(filter?: any) {
    let route: string = "";

    if (filter) {
      route = `${API_URL}/tests?where=${encodeURI(JSON.stringify(filter))}`;
    } else {
      route = `${API_URL}/tests`;
    }
    const response = await wrapper(
      axios.get(route)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async getTestById(id: number) {
    const response = await wrapper(
      axios.get(`${API_URL}/tests/${id}`)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async newTest(body: any) {
    const route = `${API_URL}/tests`;

    const response = await wrapper(
      axios.post(route, body)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async delTest(id: number) {
    const route = `${API_URL}/tests/${id}`;

    const response = await wrapper(
      axios.delete(route)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }
}