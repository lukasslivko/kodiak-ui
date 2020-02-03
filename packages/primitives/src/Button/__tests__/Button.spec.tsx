import * as React from 'react'
import serializer from 'jest-emotion'
import renderer from 'react-test-renderer'
import { Button } from '../Button'

expect.addSnapshotSerializer(serializer)

describe('Button', () => {
  it('should render the Button as a button element', () => {
    expect(renderer.create(<Button>Rendering button</Button>).toJSON())
      .toMatchInlineSnapshot(`
      .emotion-0 {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        cursor: pointer;
        display: inline-block;
        font-size: inherit;
        line-height: inherit;
        text-align: center;
        -webkit-text-decoration: none;
        text-decoration: none;
        -webkit-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 8px;
        padding-bottom: 8px;
        color: white;
        background-color: primary;
        border: 0;
        border-radius: default;
      }

      .emotion-0:hover {
        background-color: secondary;
      }

      <button
        className="emotion-0"
      >
        Rendering button
      </button>
    `)
  })

  it('should style the element with the `sx` prop', () => {
    expect(
      renderer
        .create(
          <Button sx={{ bg: 'black', color: 'white' }}>Default button</Button>,
        )
        .toJSON(),
    ).toMatchInlineSnapshot(`
      .emotion-0 {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        cursor: pointer;
        display: inline-block;
        font-size: inherit;
        line-height: inherit;
        text-align: center;
        -webkit-text-decoration: none;
        text-decoration: none;
        -webkit-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 8px;
        padding-bottom: 8px;
        color: white;
        background-color: primary;
        border: 0;
        border-radius: default;
        background-color: black;
        color: white;
      }

      .emotion-0:hover {
        background-color: secondary;
      }

      <button
        className="emotion-0"
      >
        Default button
      </button>
    `)
  })

  it('should style the element with styled-system props', () => {
    expect(renderer.create(<Button mr={1}>Default button</Button>).toJSON())
      .toMatchInlineSnapshot(`
      .emotion-0 {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        cursor: pointer;
        display: inline-block;
        font-size: inherit;
        line-height: inherit;
        text-align: center;
        -webkit-text-decoration: none;
        text-decoration: none;
        -webkit-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 8px;
        padding-bottom: 8px;
        color: white;
        background-color: primary;
        border: 0;
        border-radius: default;
        margin-right: 4px;
      }

      .emotion-0:hover {
        background-color: secondary;
      }

      <button
        className="emotion-0"
      >
        Default button
      </button>
    `)
  })
})