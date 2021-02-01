/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */
/* tslint:disable */
/* eslint-disable */
/**
 * Strimzi Kubernetes REST API
 * An API to provide k8s REST endpoints for query
 *
 * The version of the OpenAPI document: 0.1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError,
} from './base';

/**
 * Key value pair indicating possible configuration options for a topic.
 * @export
 * @interface ConfigEntry
 */
export interface ConfigEntry {
  /**
   * The key indicating what configuration entry you would like to set for the topic.
   * @type {string}
   * @memberof ConfigEntry
   */
  key?: string;
  /**
   * Value to indicate the setting on the topic configuration entry.
   * @type {string}
   * @memberof ConfigEntry
   */
  value?: string;
}
/**
 * Kafka topic partition
 * @export
 * @interface Partition
 */
export interface Partition {
  /**
   * Uniquie id for the partition
   * @type {number}
   * @memberof Partition
   */
  id: number;
  /**
   * List of replicas for the partition
   * @type {Array<object>}
   * @memberof Partition
   */
  replicas?: Array<object>;
  /**
   * List isync-replicas for this partition.
   * @type {Array<object>}
   * @memberof Partition
   */
  isr?: Array<object>;
  /**
   * Kafka server / broker.
   * @type {object}
   * @memberof Partition
   */
  leader?: object;
}
/**
 * Kafka Topic (A feed where records are stored and published)
 * @export
 * @interface Topic
 */
export interface Topic {
  /**
   * The name of the topic.
   * @type {string}
   * @memberof Topic
   */
  name?: string;
  /**
   * Topic configuration entry.
   * @type {Array<ConfigEntry>}
   * @memberof Topic
   */
  config?: Array<ConfigEntry>;
  /**
   * Partitions for this topic.
   * @type {Array<Partition>}
   * @memberof Topic
   */
  partitions?: Array<Partition>;
}
/**
 * Kafka Topic (A feed where records are stored and published)
 * @export
 * @interface TopicSettings
 */
export interface TopicSettings {
  /**
   * Number of partitions for this topic.
   * @type {number}
   * @memberof TopicSettings
   */
  numPartitions?: number;
  /**
   * Number of replications for the topic.
   * @type {number}
   * @memberof TopicSettings
   */
  replicationFactor?: number;
  /**
   * Topic configuration entry.
   * @type {Array<ConfigEntry>}
   * @memberof TopicSettings
   */
  config?: Array<ConfigEntry>;
}
/**
 * A list of topics.
 * @export
 * @interface TopicsList
 */
export interface TopicsList {
  /**
   * List of topics
   * @type {Array<Topic>}
   * @memberof TopicsList
   */
  topics: Array<Topic>;
  /**
   * The page offset
   * @type {number}
   * @memberof TopicsList
   */
  offset: number;
  /**
   * number of entries per page
   * @type {number}
   * @memberof TopicsList
   */
  limit: number;
  /**
   * Total number of topics
   * @type {number}
   * @memberof TopicsList
   */
  count: number;
}

/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     * Creates a new topic for Kafka.
     * @summary Creates a new topic
     * @param {TopicSettings} topicSettings Topic to create.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createTopic: async (
      topicSettings: TopicSettings,
      options: any = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'topicSettings' is not null or undefined
      if (topicSettings === null || topicSettings === undefined) {
        throw new RequiredError(
          'topicSettings',
          'Required parameter topicSettings was null or undefined when calling createTopic.'
        );
      }
      const localVarPath = `/topics`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      const queryParameters = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        queryParameters.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.query) {
        queryParameters.set(key, options.query[key]);
      }
      localVarUrlObj.search = new URLSearchParams(queryParameters).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      const nonString = typeof topicSettings !== 'string';
      const needsSerialization =
        nonString && configuration && configuration.isJsonMime
          ? configuration.isJsonMime(
              localVarRequestOptions.headers['Content-Type']
            )
          : nonString;
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(topicSettings !== undefined ? topicSettings : {})
        : topicSettings || '';

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     * Deletes the topic with the specified id.
     * @summary Deletes a  topic
     * @param {string} topicName The topic name to retrieve.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteTopic: async (
      topicName: string,
      options: any = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'topicName' is not null or undefined
      if (topicName === null || topicName === undefined) {
        throw new RequiredError(
          'topicName',
          'Required parameter topicName was null or undefined when calling deleteTopic.'
        );
      }
      const localVarPath = `/topics/{topicName}`.replace(
        `{${'topicName'}}`,
        encodeURIComponent(String(topicName))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: 'DELETE',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      const queryParameters = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        queryParameters.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.query) {
        queryParameters.set(key, options.query[key]);
      }
      localVarUrlObj.search = new URLSearchParams(queryParameters).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     * Topic
     * @summary Topic associated with the topic id
     * @param {string} topicName The topic name to retrieve.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getTopic: async (
      topicName: string,
      options: any = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'topicName' is not null or undefined
      if (topicName === null || topicName === undefined) {
        throw new RequiredError(
          'topicName',
          'Required parameter topicName was null or undefined when calling getTopic.'
        );
      }
      const localVarPath = `/topics/{topicName}`.replace(
        `{${'topicName'}}`,
        encodeURIComponent(String(topicName))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      const queryParameters = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        queryParameters.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.query) {
        queryParameters.set(key, options.query[key]);
      }
      localVarUrlObj.search = new URLSearchParams(queryParameters).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns a list of all of the available topics, or the list of topics that meet the users URL Query Parameters.
     * @summary List of topics
     * @param {number} [limit] Maximum number of topics to return
     * @param {string} [filter] Filter to apply when returning the list of topics
     * @param {number} [offset] The page offset when returning  the limit of requested topics.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getTopicsList: async (
      limit?: number,
      filter?: string,
      offset?: number,
      options: any = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/topics`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      if (limit !== undefined) {
        localVarQueryParameter['limit'] = limit;
      }

      if (filter !== undefined) {
        localVarQueryParameter['filter'] = filter;
      }

      if (offset !== undefined) {
        localVarQueryParameter['offset'] = offset;
      }

      const queryParameters = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        queryParameters.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.query) {
        queryParameters.set(key, options.query[key]);
      }
      localVarUrlObj.search = new URLSearchParams(queryParameters).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     * updates the topic with the new data.
     * @summary Updates the topic with the specified id.
     * @param {string} topicName The topic name which is it\&#39;s unique id.
     * @param {TopicSettings} topicSettings
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateTopic: async (
      topicName: string,
      topicSettings: TopicSettings,
      options: any = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'topicName' is not null or undefined
      if (topicName === null || topicName === undefined) {
        throw new RequiredError(
          'topicName',
          'Required parameter topicName was null or undefined when calling updateTopic.'
        );
      }
      // verify required parameter 'topicSettings' is not null or undefined
      if (topicSettings === null || topicSettings === undefined) {
        throw new RequiredError(
          'topicSettings',
          'Required parameter topicSettings was null or undefined when calling updateTopic.'
        );
      }
      const localVarPath = `/topics/{topicName}`.replace(
        `{${'topicName'}}`,
        encodeURIComponent(String(topicName))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: 'PATCH',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      const queryParameters = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        queryParameters.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.query) {
        queryParameters.set(key, options.query[key]);
      }
      localVarUrlObj.search = new URLSearchParams(queryParameters).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      const nonString = typeof topicSettings !== 'string';
      const needsSerialization =
        nonString && configuration && configuration.isJsonMime
          ? configuration.isJsonMime(
              localVarRequestOptions.headers['Content-Type']
            )
          : nonString;
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(topicSettings !== undefined ? topicSettings : {})
        : topicSettings || '';

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function (configuration?: Configuration) {
  return {
    /**
     * Creates a new topic for Kafka.
     * @summary Creates a new topic
     * @param {TopicSettings} topicSettings Topic to create.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createTopic(
      topicSettings: TopicSettings,
      options?: any
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Topic>
    > {
      const localVarAxiosArgs = await DefaultApiAxiosParamCreator(
        configuration
      ).createTopic(topicSettings, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: (configuration?.basePath || basePath) + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * Deletes the topic with the specified id.
     * @summary Deletes a  topic
     * @param {string} topicName The topic name to retrieve.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deleteTopic(
      topicName: string,
      options?: any
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs = await DefaultApiAxiosParamCreator(
        configuration
      ).deleteTopic(topicName, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: (configuration?.basePath || basePath) + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * Topic
     * @summary Topic associated with the topic id
     * @param {string} topicName The topic name to retrieve.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getTopic(
      topicName: string,
      options?: any
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Topic>
    > {
      const localVarAxiosArgs = await DefaultApiAxiosParamCreator(
        configuration
      ).getTopic(topicName, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: (configuration?.basePath || basePath) + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * Returns a list of all of the available topics, or the list of topics that meet the users URL Query Parameters.
     * @summary List of topics
     * @param {number} [limit] Maximum number of topics to return
     * @param {string} [filter] Filter to apply when returning the list of topics
     * @param {number} [offset] The page offset when returning  the limit of requested topics.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getTopicsList(
      limit?: number,
      filter?: string,
      offset?: number,
      options?: any
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<TopicsList>
    > {
      const localVarAxiosArgs = await DefaultApiAxiosParamCreator(
        configuration
      ).getTopicsList(limit, filter, offset, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: (configuration?.basePath || basePath) + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * updates the topic with the new data.
     * @summary Updates the topic with the specified id.
     * @param {string} topicName The topic name which is it\&#39;s unique id.
     * @param {TopicSettings} topicSettings
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updateTopic(
      topicName: string,
      topicSettings: TopicSettings,
      options?: any
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Topic>
    > {
      const localVarAxiosArgs = await DefaultApiAxiosParamCreator(
        configuration
      ).updateTopic(topicName, topicSettings, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: (configuration?.basePath || basePath) + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
  };
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  return {
    /**
     * Creates a new topic for Kafka.
     * @summary Creates a new topic
     * @param {TopicSettings} topicSettings Topic to create.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createTopic(
      topicSettings: TopicSettings,
      options?: any
    ): AxiosPromise<Topic> {
      return DefaultApiFp(configuration)
        .createTopic(topicSettings, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Deletes the topic with the specified id.
     * @summary Deletes a  topic
     * @param {string} topicName The topic name to retrieve.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteTopic(topicName: string, options?: any): AxiosPromise<void> {
      return DefaultApiFp(configuration)
        .deleteTopic(topicName, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Topic
     * @summary Topic associated with the topic id
     * @param {string} topicName The topic name to retrieve.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getTopic(topicName: string, options?: any): AxiosPromise<Topic> {
      return DefaultApiFp(configuration)
        .getTopic(topicName, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of all of the available topics, or the list of topics that meet the users URL Query Parameters.
     * @summary List of topics
     * @param {number} [limit] Maximum number of topics to return
     * @param {string} [filter] Filter to apply when returning the list of topics
     * @param {number} [offset] The page offset when returning  the limit of requested topics.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getTopicsList(
      limit?: number,
      filter?: string,
      offset?: number,
      options?: any
    ): AxiosPromise<TopicsList> {
      return DefaultApiFp(configuration)
        .getTopicsList(limit, filter, offset, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * updates the topic with the new data.
     * @summary Updates the topic with the specified id.
     * @param {string} topicName The topic name which is it\&#39;s unique id.
     * @param {TopicSettings} topicSettings
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateTopic(
      topicName: string,
      topicSettings: TopicSettings,
      options?: any
    ): AxiosPromise<Topic> {
      return DefaultApiFp(configuration)
        .updateTopic(topicName, topicSettings, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * DefaultApi - interface
 * @export
 * @interface DefaultApi
 */
export interface DefaultApiInterface {
  /**
   * Creates a new topic for Kafka.
   * @summary Creates a new topic
   * @param {TopicSettings} topicSettings Topic to create.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApiInterface
   */
  createTopic(topicSettings: TopicSettings, options?: any): AxiosPromise<Topic>;

  /**
   * Deletes the topic with the specified id.
   * @summary Deletes a  topic
   * @param {string} topicName The topic name to retrieve.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApiInterface
   */
  deleteTopic(topicName: string, options?: any): AxiosPromise<void>;

  /**
   * Topic
   * @summary Topic associated with the topic id
   * @param {string} topicName The topic name to retrieve.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApiInterface
   */
  getTopic(topicName: string, options?: any): AxiosPromise<Topic>;

  /**
   * Returns a list of all of the available topics, or the list of topics that meet the users URL Query Parameters.
   * @summary List of topics
   * @param {number} [limit] Maximum number of topics to return
   * @param {string} [filter] Filter to apply when returning the list of topics
   * @param {number} [offset] The page offset when returning  the limit of requested topics.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApiInterface
   */
  getTopicsList(
    limit?: number,
    filter?: string,
    offset?: number,
    options?: any
  ): AxiosPromise<TopicsList>;

  /**
   * updates the topic with the new data.
   * @summary Updates the topic with the specified id.
   * @param {string} topicName The topic name which is it\&#39;s unique id.
   * @param {TopicSettings} topicSettings
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApiInterface
   */
  updateTopic(
    topicName: string,
    topicSettings: TopicSettings,
    options?: any
  ): AxiosPromise<Topic>;
}

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI implements DefaultApiInterface {
  /**
   * Creates a new topic for Kafka.
   * @summary Creates a new topic
   * @param {TopicSettings} topicSettings Topic to create.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public createTopic(topicSettings: TopicSettings, options?: any) {
    return DefaultApiFp(this.configuration)
      .createTopic(topicSettings, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Deletes the topic with the specified id.
   * @summary Deletes a  topic
   * @param {string} topicName The topic name to retrieve.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public deleteTopic(topicName: string, options?: any) {
    return DefaultApiFp(this.configuration)
      .deleteTopic(topicName, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Topic
   * @summary Topic associated with the topic id
   * @param {string} topicName The topic name to retrieve.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public getTopic(topicName: string, options?: any) {
    return DefaultApiFp(this.configuration)
      .getTopic(topicName, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Returns a list of all of the available topics, or the list of topics that meet the users URL Query Parameters.
   * @summary List of topics
   * @param {number} [limit] Maximum number of topics to return
   * @param {string} [filter] Filter to apply when returning the list of topics
   * @param {number} [offset] The page offset when returning  the limit of requested topics.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public getTopicsList(
    limit?: number,
    filter?: string,
    offset?: number,
    options?: any
  ) {
    return DefaultApiFp(this.configuration)
      .getTopicsList(limit, filter, offset, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * updates the topic with the new data.
   * @summary Updates the topic with the specified id.
   * @param {string} topicName The topic name which is it\&#39;s unique id.
   * @param {TopicSettings} topicSettings
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public updateTopic(
    topicName: string,
    topicSettings: TopicSettings,
    options?: any
  ) {
    return DefaultApiFp(this.configuration)
      .updateTopic(topicName, topicSettings, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
