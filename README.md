# ReactJS Admin API

![ci badge](https://github.com/syskin/admin-api-dashboard/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/syskin/admin-api-dashboard/branch/main/graph/badge.svg?token=4K00GAQQSQ)](https://codecov.io/gh/syskin/admin-api-dashboard)
[![GitHub version](https://img.shields.io/badge/version-v1.0.0-blue.svg)](https://github.com/syskin/admin-api-dashboard)

ReactJS admin dashboard to manage your data through an admin API

## Description

This project allow you to manage your entities data through admin endpoints (from an API), with simple operation like getAll, getOneById, updateOneById or deleteOneById. You can perform custom actions (API call) by adding them to your configurations file.

## Requirements
1. Node.js >= 12.x
2. A well designed API (You can setup a Strapi project to create a quick API)

## Getting started

### Configuration

Copy paste `.env-example` to `.env` to the root folder of the project.

|Key|Type|Default|Description|
|---|----|-------|-----------|
|AUTHENTICATION|boolean|true|Allow authentication page that stores a Bearer token to every axios call|
|---|----|-------|-----------|
|BASE_URL|string|-|Define the base url of your admin API|

### Build
TODO

## Included in the project
- Login interface
- Dynamic form generation
- Dynamic data table with filters
- Development & production environments
- Tests (WIP)

## Project structure
 
TODO
